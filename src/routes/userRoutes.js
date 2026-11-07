
const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");

router.get("/", ticketController.getAllUsers);

module.exports = router;
