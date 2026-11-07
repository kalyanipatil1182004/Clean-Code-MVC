
const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");

router.get("/", ticketController.getTicketStats);

module.exports = router;
