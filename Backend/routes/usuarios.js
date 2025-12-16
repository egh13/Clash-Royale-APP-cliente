const express = require("express");
const router = express.Router();
const db = require("../sqlite/db");
const bcrypt = require("bcrypt");

const saltRounds = 4;

// Registrar usuario
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const role = "usuario";

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos" });
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
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)"
    );
    const result = stmt.run(username, hashedPassword, role);
    res.json({ id: result.lastInsertRowid }); // Devuelve el id del usuario
  } catch (err) {
    // Manejar error de UNIQUE constraint
    if (err.message.includes("UNIQUE constraint failed: users.username")) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Login
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
        .status(400)
        .json({ error: "Usuario o contraseña incorrectas" });
    }

    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Cambiar contraseña
router.put("/change-password", async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  if (!username || !oldPassword || !newPassword)
    return res.status(400).json({ error: "Faltan datos" });

  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match)
    return res.status(400).json({ error: "Contraseña actual incorrecta" });

  const hashedNew = await bcrypt.hash(newPassword, saltRounds);
  db.prepare("UPDATE users SET password = ? WHERE username = ?").run(
    hashedNew,
    username
  );
  res.json({ message: "Contraseña actualizada" });
});

// Borrar usuario
// TODO: este endpoint solo debe funcionar con la autenticacion indicada

router.post("/delete", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Faltan datos" });

  const stmt = db.prepare("DELETE FROM users WHERE username = ?");
  const info = stmt.run(username);
  if (info.changes === 0)
    return res.status(400).json({ error: "Usuario no encontrado" });

  res.json({ message: "Usuario eliminado" });
});

module.exports = router;
