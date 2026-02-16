const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const db = require('../sqlite/db');

// GET /api/mazos - Obtener mazos del usuario
router.get('/', authMiddleware, (req, res) => {
  try {
    const usuarioId = req.user.id;

    // Obtener mazos del usuario
    const mazos = db.prepare(`
      SELECT 
        m.id,
        m.nombre,
        m.modo_juego as modoJuego,
        m.usuario_id as usuarioId,
        m.created_at as createdAt,
        m.updated_at as updatedAt
      FROM mazos m
      WHERE m.usuario_id = ?
      ORDER BY m.created_at DESC
    `).all(usuarioId);

    // Obtener cartas para cada mazo
    const mazosConCartas = mazos.map(mazo => {
      const cartas = db.prepare(`
        SELECT carta_data FROM cartas_mazo 
        WHERE mazo_id = ? 
        ORDER BY posicion
      `).all(mazo.id);

      return {
        ...mazo,
        cartas: cartas.map(c => JSON.parse(c.carta_data))
      };
    });

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

// POST /api/mazos - Crear nuevo mazo
router.post('/', authMiddleware, (req, res) => {
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

    // Transacción para crear mazo y cartas
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
        INSERT INTO cartas_mazo (mazo_id, carta_data, posicion)
        VALUES (?, ?, ?)
      `);

      cartas.forEach((carta, index) => {
        insertCarta.run(mazoId, JSON.stringify(carta), index);
      });

      return mazoId;
    });

    const mazoId = transaction();

    // Obtener mazo creado completo
    const mazoCreado = db.prepare(`
      SELECT 
        m.id,
        m.nombre,
        m.modo_juego as modoJuego,
        m.usuario_id as usuarioId,
        m.created_at as createdAt,
        m.updated_at as updatedAt
      FROM mazos m
      WHERE m.id = ?
    `).get(mazoId);

    const cartasMazo = db.prepare(`
      SELECT carta_data FROM cartas_mazo 
      WHERE mazo_id = ? 
      ORDER BY posicion
    `).all(mazoId);

    const mazoCompleto = {
      ...mazoCreado,
      cartas: cartasMazo.map(c => JSON.parse(c.carta_data))
    };

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

// PUT /api/mazos/:id - Actualizar mazo
router.put('/:id', authMiddleware, (req, res) => {
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

        updates.push("updated_at = datetime('now')");
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
          INSERT INTO cartas_mazo (mazo_id, carta_data, posicion)
          VALUES (?, ?, ?)
        `);

        cartas.forEach((carta, index) => {
          insertCarta.run(mazoId, JSON.stringify(carta), index);
        });
      }
    });

    transaction();

    // Obtener mazo actualizado
    const mazoActualizado = db.prepare(`
      SELECT 
        m.id,
        m.nombre,
        m.modo_juego as modoJuego,
        m.usuario_id as usuarioId,
        m.created_at as createdAt,
        m.updated_at as updatedAt
      FROM mazos m
      WHERE m.id = ?
    `).get(mazoId);

    const cartasMazo = db.prepare(`
      SELECT carta_data FROM cartas_mazo 
      WHERE mazo_id = ? 
      ORDER BY posicion
    `).all(mazoId);

    const mazoCompleto = {
      ...mazoActualizado,
      cartas: cartasMazo.map(c => JSON.parse(c.carta_data))
    };

    res.json({
      success: true,
      data: mazoCompleto,
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

// DELETE /api/mazos/:id - Eliminar mazo
router.delete('/:id', authMiddleware, (req, res) => {
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

module.exports = router;