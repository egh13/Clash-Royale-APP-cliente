const express = require("express");
const axios = require("axios");
const router = express.Router();

//llamar api clash royale
router.get("leaderboards", async (req, res) => {
  try {
    const response = await axios.get(
      "https://proxy.royaleapi.dev/v1/locations/global/seasons",
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error llamando a la API externa" });
  }
});

router.get("/", (req, res)=>{
    res.send("holaasdf");
})

module.exports = router;