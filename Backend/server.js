const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:4200", "http://localhost:4201"], // app de Angular
    credentials: true, // permite cookies
  })
);
app.use(express.json());

//router para manejar los enpoint de la developer API Clash Royale
const apiRouter = require("./routes/developerApi");
app.use("/api/developerApi", apiRouter);

//router para manejar los enpoint de autenticacion
const usuariosRouter = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRouter);

//router para manejar los endpoints de mazos
const mazosRouter = require("./routes/mazos");
app.use("/api/mazos", mazosRouter);

//inciar servidor en puerto 3000
app.listen(3000, () => {
  console.log("Servidor Express corriendo en http://localhost:3000");
});

