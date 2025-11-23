const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true})); //permite pasar los datos en formato urlecoded

const bdJson = JSON.parse(fs.readFileSync("auth/usuarios.bd.json", "utf8"));

function authenticateUser(username, password) {
  const user = bdJson.users.find((u) => u.username === username);

  if (user) {
    if (user.password === password) {
      // Crear el JWT
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET, // Clave para encriptar 
        { expiresIn: "1h" } // Token expira en 1h
      );
      return { token };
    }
  }
  return null;
}

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const result = authenticateUser(username, password);

  if (result) {
    res.json({ message: "Autenticación exitosa" , token: result.token });
  } else {
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }
});

module.exports = router;
