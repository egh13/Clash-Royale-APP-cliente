const express = require("express");
const router = express.Router();
const db = require("../sqlite/db");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth.middleware");
const saltRounds = 4;


// Registrar usuario
router.post("/register", async (req, res) => {
  const { username, password, email, birthDate, userType, newsletter } = req.body;
  const role = "usuario";

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: "El usuario debe tener al menos 3 caracteres" });
  }
  if (password.length < 4) {
    return res
      .status(400)
      .json({ error: "La contraseña debe tener al menos 4 caracteres" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const stmt = db.prepare(
      "INSERT INTO users (username, password, email, birth_date, user_type, newsletter, role) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    const result = stmt.run(username, hashedPassword, email, birthDate || null, userType || null, newsletter ? 1 : 0, role);
    res.json({ id: result.lastInsertRowid }); // Devuelve el id del usuario
  } catch (err) {
    // Manejar error de UNIQUE constraint
    if (err.message.includes("UNIQUE constraint failed: users.username")) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    if (err.message.includes("UNIQUE constraint failed: users.email")) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Login
// constantes del jwt

const jwt = require("jsonwebtoken");
const JWT_EXPIRES_IN = "1h";
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const user = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectas" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // envio respuesta 
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Cambiar contraseña

router.put('/change-password', authMiddleware, async (req, res) => {
  const { newPassword } = req.body;
  const username = req.user.username; // viene del JWT

  if (!newPassword)
    return res.status(400).json({ error: 'Faltan datos' });

  const user = db
    .prepare('SELECT * FROM users WHERE username = ?')
    .get(username);

  const hashedNew = await bcrypt.hash(newPassword, saltRounds);
  db.prepare('UPDATE users SET password = ? WHERE username = ?').run(
    hashedNew,
    username
  );

  res.json({ message: 'Contraseña actualizada' });
});


// Borrar usuario

router.delete('/me', authMiddleware, (req, res) => {
  const username = req.user.username; // viene del JWT

  const stmt = db.prepare('DELETE FROM users WHERE username = ?');
  const info = stmt.run(username);

  if (info.changes === 0) {
    return res.status(400).json({ error: 'Usuario no encontrado' });
  }

  res.json({ message: 'Usuario eliminado' });
});

// Agregar Clash Royale ID
router.post('/setClashRoyaleId', authMiddleware, (req, res) => {
  const username = req.user.username; // viene del JWT
  const { clashRoyaleId } = req.body;

  // Validaciones
  if (!clashRoyaleId) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  if (clashRoyaleId.length !== 9) {
    return res
      .status(400)
      .json({ error: 'El Clash Royale ID debe tener exactamente 9 caracteres' });
  }

  try {
    const stmt = db.prepare(
      'UPDATE users SET clashRoyaleId = ? WHERE username = ?'
    );

    const result = stmt.run(clashRoyaleId, username);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Clash Royale ID guardado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor', failed: err.message });
  }
});

module.exports = router;
