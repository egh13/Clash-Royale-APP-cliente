const Database = require('better-sqlite3');

// crea o abre database.db
const db = new Database('sqlite/clashRoyale.db');

// crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('usuario', 'admin'))
  )
`).run();

module.exports = db;
