const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../config/multer");
const {

    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getDashboardSummary,
    getMonthlyStats


} = require("../controllers/transactionController");

router.post(
    "/",
    protect,
    authorize("user", "moderator", "admin"),
    upload.single("receipt"),
    addTransaction
);
router.get(
    "/",
    protect,
    authorize("user", "moderator", "admin"),
    getTransactions
);
router.put(
    "/:id",
    protect,
    authorize("user", "moderator", "admin"),
    updateTransaction
);
router.delete(
    "/:id",
    protect,
    authorize("user", "moderator", "admin"),
    deleteTransaction
);
router.get(
    "/summary",
    protect,
    authorize("user", "moderator", "admin"),
    getDashboardSummary
);
router.get(
    "/monthly-stats",
    protect,
    authorize("user", "moderator", "admin"),
    getMonthlyStats
);
module.exports = router;