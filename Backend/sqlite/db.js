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
    role TEXT NOT NULL CHECK(role IN ('usuario', 'admin')),
    clashRoyaleId TEXT
  )
`).run();

module.exports = db;
