// ===========================================
// ENDPOINTS BACKEND NECESARIOS PARA MIS-MAZOS
// ===========================================

/*
  PREREQUISITOS:
  1. JWT Authentication middleware configurado
  2. Base de datos con tablas: usuarios, mazos, cartas_mazo
  3. Middleware para validar usuario autenticado
*/

// Ruta base: /api/mazos
// Todas las rutas requieren autenticación JWT

// ===========================================
// 1. GET /api/mazos - Obtener mazos del usuario
// ===========================================
router.get('/api/mazos', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id; // Extraído del JWT token
    
    const mazos = await db.prepare(`
      SELECT 
        m.id,
        m.nombre,
        m.modo_juego as modoJuego,
        m.usuario_id as usuarioId,
        m.created_at as createdAt,
        m.updated_at as updatedAt,
        GROUP_CONCAT(
          json_object(
            'id', c.id,
            'nombre', c.nombre,
            'imagen', c.imagen,
            'coste', c.coste,
            'tipo', c.tipo
          )
        ) as cartas
      FROM mazos m
      LEFT JOIN cartas_mazo cm ON m.id = cm.mazo_id
      LEFT JOIN cartas c ON cm.carta_id = c.id
      WHERE m.usuario_id = ?
      GROUP BY m.id
      ORDER BY m.created_at DESC
    `).all(usuarioId);

    // Procesar cartas JSON
    const mazosConCartas = mazos.map(mazo => ({
      ...mazo,
      cartas: mazo.cartas ? 
        mazo.cartas.split(',').map(cartaStr => JSON.parse(cartaStr)) : 
        []
    }));

    res.json({
      success: true,
      data: mazosConCartas,
      message: 'Mazos obtenidos exitosamente'
    });

  } catch (error) {
    console.error('Error obteniendo mazos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// ===========================================
// 2. POST /api/mazos - Crear nuevo mazo
// ===========================================
router.post('/api/mazos', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { nombre, modoJuego, cartas } = req.body;

    // Validación
    if (!nombre || !modoJuego || !cartas || cartas.length !== 8) {
      return res.status(400).json({
        success: false,
        message: 'Datos inválidos. Se requiere nombre, modoJuego y exactamente 8 cartas.'
      });
    }

    // Iniciar transacción
    const transaction = db.transaction(() => {
      // Crear mazo
      const insertMazo = db.prepare(`
        INSERT INTO mazos (nombre, modo_juego, usuario_id, created_at, updated_at)
        VALUES (?, ?, ?, datetime('now'), datetime('now'))
      `);
      
      const result = insertMazo.run(nombre, modoJuego, usuarioId);
      const mazoId = result.lastInsertRowid;

      // Insertar cartas del mazo
      const insertCarta = db.prepare(`
        INSERT INTO cartas_mazo (mazo_id, carta_id, posicion)
        VALUES (?, ?, ?)
      `);

      cartas.forEach((carta, index) => {
        insertCarta.run(mazoId, carta.id, index);
      });

      return mazoId;
    });

    const mazoId = transaction();

    // Obtener mazo creado completo
    const mazoCompleto = await obtenerMazoPorId(mazoId);

    res.status(201).json({
      success: true,
      data: mazoCompleto,
      message: 'Mazo creado exitosamente'
    });

  } catch (error) {
    console.error('Error creando mazo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// ===========================================
// 3. PUT /api/mazos/:id - Actualizar mazo
// ===========================================
router.put('/api/mazos/:id', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const mazoId = req.params.id;
    const { nombre, modoJuego, cartas } = req.body;

    // Verificar que el mazo pertenece al usuario
    const mazoExistente = db.prepare(`
      SELECT id FROM mazos WHERE id = ? AND usuario_id = ?
    `).get(mazoId, usuarioId);

    if (!mazoExistente) {
      return res.status(404).json({
        success: false,
        message: 'Mazo no encontrado o sin permisos'
      });
    }

    // Validación
    if (cartas && cartas.length !== 8) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren exactamente 8 cartas'
      });
    }

    // Transacción para actualizar
    const transaction = db.transaction(() => {
      // Actualizar datos del mazo
      if (nombre || modoJuego) {
        const updates = [];
        const values = [];
        
        if (nombre) {
          updates.push('nombre = ?');
          values.push(nombre);
        }
        if (modoJuego) {
          updates.push('modo_juego = ?');
          values.push(modoJuego);
        }
        
        updates.push('updated_at = datetime("now")');
        values.push(mazoId);

        const updateQuery = `UPDATE mazos SET ${updates.join(', ')} WHERE id = ?`;
        db.prepare(updateQuery).run(...values);
      }

      // Actualizar cartas si se proporcionaron
      if (cartas) {
        // Eliminar cartas existentes
        db.prepare('DELETE FROM cartas_mazo WHERE mazo_id = ?').run(mazoId);
        
        // Insertar nuevas cartas
        const insertCarta = db.prepare(`
          INSERT INTO cartas_mazo (mazo_id, carta_id, posicion)
          VALUES (?, ?, ?)
        `);

        cartas.forEach((carta, index) => {
          insertCarta.run(mazoId, carta.id, index);
        });
      }
    });

    transaction();

    // Obtener mazo actualizado
    const mazoActualizado = await obtenerMazoPorId(mazoId);

    res.json({
      success: true,
      data: mazoActualizado,
      message: 'Mazo actualizado exitosamente'
    });

  } catch (error) {
    console.error('Error actualizando mazo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// ===========================================
// 4. DELETE /api/mazos/:id - Eliminar mazo
// ===========================================
router.delete('/api/mazos/:id', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const mazoId = req.params.id;

    // Verificar que el mazo pertenece al usuario
    const mazoExistente = db.prepare(`
      SELECT nombre FROM mazos WHERE id = ? AND usuario_id = ?
    `).get(mazoId, usuarioId);

    if (!mazoExistente) {
      return res.status(404).json({
        success: false,
        message: 'Mazo no encontrado o sin permisos'
      });
    }

    // Transacción para eliminar
    const transaction = db.transaction(() => {
      // Eliminar cartas del mazo
      db.prepare('DELETE FROM cartas_mazo WHERE mazo_id = ?').run(mazoId);
      
      // Eliminar mazo
      db.prepare('DELETE FROM mazos WHERE id = ?').run(mazoId);
    });

    transaction();

    res.json({
      success: true,
      message: `Mazo "${mazoExistente.nombre}" eliminado exitosamente`
    });

  } catch (error) {
    console.error('Error eliminando mazo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// ===========================================
// FUNCIÓN AUXILIAR
// ===========================================
async function obtenerMazoPorId(mazoId) {
  const mazo = db.prepare(`
    SELECT 
      m.id,
      m.nombre,
      m.modo_juego as modoJuego,
      m.usuario_id as usuarioId,
      m.created_at as createdAt,
      m.updated_at as updatedAt,
      GROUP_CONCAT(
        json_object(
          'id', c.id,
          'nombre', c.nombre,
          'imagen', c.imagen,
          'coste', c.coste,
          'tipo', c.tipo
        )
      ) as cartas
    FROM mazos m
    LEFT JOIN cartas_mazo cm ON m.id = cm.mazo_id
    LEFT JOIN cartas c ON cm.carta_id = c.id
    WHERE m.id = ?
    GROUP BY m.id
  `).get(mazoId);

  return {
    ...mazo,
    cartas: mazo.cartas ? 
      mazo.cartas.split(',').map(cartaStr => JSON.parse(cartaStr)) : 
      []
  };
}

// ===========================================
// ESQUEMA DE BASE DE DATOS NECESARIO
// ===========================================

/*
-- Tabla de mazos
CREATE TABLE IF NOT EXISTS mazos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  modo_juego VARCHAR(50) NOT NULL,
  usuario_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de cartas (si no existe)
CREATE TABLE IF NOT EXISTS cartas (
  id VARCHAR(10) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  imagen VARCHAR(200) NOT NULL,
  coste INTEGER,
  tipo VARCHAR(50)
);

-- Tabla de relación mazos-cartas
CREATE TABLE IF NOT EXISTS cartas_mazo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mazo_id INTEGER NOT NULL,
  carta_id VARCHAR(10) NOT NULL,
  posicion INTEGER NOT NULL,
  FOREIGN KEY (mazo_id) REFERENCES mazos(id) ON DELETE CASCADE,
  FOREIGN KEY (carta_id) REFERENCES cartas(id) ON DELETE CASCADE
);

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_mazos_usuario ON mazos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_cartas_mazo_mazo ON cartas_mazo(mazo_id);
CREATE INDEX IF NOT EXISTS idx_cartas_mazo_carta ON cartas_mazo(carta_id);
*/

// ===========================================
// MIDDLEWARE DE AUTENTICACIÓN REQUERIDO
// ===========================================

/*
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso requerido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};
*/