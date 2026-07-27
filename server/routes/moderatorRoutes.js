const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    getModeratorDashboard,
    getTickets,
    updateTicket,
    getFraudReports,
    updateFraudReport
} = require("../controllers/moderatorController");

router.get(
    "/dashboard",
    protect,
    authorize("moderator"),
    getModeratorDashboard
);
router.get(
    "/tickets",
    protect,
    authorize("moderator"),
    getTickets
);


router.put(
    "/tickets/:id",
    protect,
    authorize("moderator"),
    updateTicket
);
router.get(
    "/fraud",
    protect,
    authorize("moderator"),
    getFraudReports
);


router.put(
    "/fraud/:id",
    protect,
    authorize("moderator"),
    updateFraudReport
);

module.exports = router;