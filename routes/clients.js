const express = require("express");
const ClientController = require("../controllers/ClientController");
const router = express.Router();

router.post("/", ClientController.create);

module.exports = router;