const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//router para manejar los enpoint de la developer API Clash Royale
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

//inciar servidor en puerto 3000
app.listen(3000, () => {
  console.log("Servidor Express corriendo en http://localhost:3000");
});

