const Database = require('better-sqlite3');
const path = require('path');

// crea o abre database.db con ruta absoluta
const dbPath = path.join(__dirname, 'clashRoyale.db');
const db = new Database(dbPath);

// crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    birth_date TEXT,
    user_type TEXT,
    newsletter INTEGER DEFAULT 0,
    role TEXT NOT NULL CHECK(role IN ('usuario', 'admin')),
    clashRoyaleId TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS mazos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    modo_juego VARCHAR(50) NOT NULL,
    usuario_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS cartas_mazo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mazo_id INTEGER NOT NULL,
    carta_data TEXT NOT NULL,
    posicion INTEGER NOT NULL,
    FOREIGN KEY (mazo_id) REFERENCES mazos(id) ON DELETE CASCADE
  )
`).run();

module.exports = db;
