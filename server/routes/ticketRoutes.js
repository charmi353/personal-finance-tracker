const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createTicket } = require("../controllers/ticketController");

router.post("/", protect, createTicket);

module.exports = router;