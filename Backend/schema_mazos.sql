-- ===========================================
-- SCHEMA PARA MIS-MAZOS - CLASH ROYALE APP
-- ===========================================

-- Tabla de mazos
CREATE TABLE IF NOT EXISTS mazos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  modo_juego VARCHAR(50) NOT NULL,
  usuario_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
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
  carta_data TEXT NOT NULL,
  posicion INTEGER NOT NULL,
  FOREIGN KEY (mazo_id) REFERENCES mazos(id) ON DELETE CASCADE
);

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_mazos_usuario ON mazos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_cartas_mazo_mazo ON cartas_mazo(mazo_id);

-- ===========================================
-- DATOS DE EJEMPLO - CARTAS CLASH ROYALE
-- ===========================================

-- Insertar algunas cartas de ejemplo si no existen
INSERT OR IGNORE INTO cartas (id, nombre, imagen, coste, tipo) VALUES
-- Tropas
('knight', 'Caballero', '/images/cartas/knight.png', 3, 'tropa'),
('archers', 'Arqueras', '/images/cartas/archers.png', 3, 'tropa'),
('goblins', 'Duendes', '/images/cartas/goblins.png', 2, 'tropa'),
('giant', 'Gigante', '/images/cartas/giant.png', 5, 'tropa'),
('wizard', 'Mago', '/images/cartas/wizard.png', 5, 'tropa'),
('dragon', 'Bebé Dragón', '/images/cartas/dragon.png', 4, 'tropa'),
('pekka', 'P.E.K.K.A', '/images/cartas/pekka.png', 7, 'tropa'),
('minions', 'Esbirros', '/images/cartas/minions.png', 3, 'tropa'),

-- Hechizos
('fireball', 'Bola de Fuego', '/images/cartas/fireball.png', 4, 'hechizo'),
('arrows', 'Flechas', '/images/cartas/arrows.png', 3, 'hechizo'),
('lightning', 'Rayo', '/images/cartas/lightning.png', 6, 'hechizo'),
('zap', 'Descarga', '/images/cartas/zap.png', 2, 'hechizo'),

-- Edificios
('cannon', 'Cañón', '/images/cartas/cannon.png', 3, 'edificio'),
('tesla', 'Torre Tesla', '/images/cartas/tesla.png', 4, 'edificio'),
('inferno', 'Torre Infierno', '/images/cartas/inferno.png', 5, 'edificio'),
('xbow', 'Ballesta X', '/images/cartas/xbow.png', 6, 'edificio');