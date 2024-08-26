const express = require("express");
const router = express.Router();
const playersController = require("../controllers/playersController");

router.route("/characters")
    .get(playersController.getAllCharacters);

router.route("/players")
    .post(playersController.saveAllPlayers)
    .get(playersController.getAllPlayers);

module.exports = router;