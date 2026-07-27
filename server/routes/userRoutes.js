const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getAllUsers,
    deleteUser
} = require("../controllers/userController");

// Only Admin can access these
router.get(
    "/",
    protect,
    authorizeRoles("admin"),
    getAllUsers
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteUser
);

module.exports = router;