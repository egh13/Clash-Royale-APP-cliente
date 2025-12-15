const express = require("express");
const axios = require("axios");
const router = express.Router();

async function callDeveloperAPI(url, optParameters) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      params: optParameters,
    });

    return response.data;

  } catch (error) {
    return {error: "Error llamando a la API externa",details: error.message,};
  }
}

//informacion de un jugador, escribir el playerId sin # en la url
router.get("/players/:playerId", async(req, res) => {

  let playerId = "%23"+req.params.playerId;

  const url = `https://proxy.royaleapi.dev/v1/players/${playerId}`;
  const optParameters = {};

  const data = await callDeveloperAPI(url, optParameters);
  res.json(data);
});

//clan rankings de una localizacion especifica
router.get("/clans/rankings/:locationId", async(req, res) => {

  const url = `https://proxy.royaleapi.dev/v1/locations/${req.params.locationId}/rankings/clans`;
  const optParameters = {limit: 10}; //solo diez primeros

  const data = await callDeveloperAPI(url, optParameters);
  res.json(data);
});

//obtener todas las cartas disponibles 
router.get("/cards", async(req, res) => {

  const url = `https://proxy.royaleapi.dev/v1/cards`;
  const optParameters = {};

  const data = await callDeveloperAPI(url, optParameters);
  res.json(data);
});

router.get("/", (req, res)=>{
    res.send("la api funciona correctamente");
})

module.exports = router;