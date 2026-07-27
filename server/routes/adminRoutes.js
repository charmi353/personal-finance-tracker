const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const {

    getUsers,
    updateUserRole,
    deleteUser,
    getAdminDashboard

} = require("../controllers/adminController");
router.get(

    "/dashboard",

    protect,

    authorize("admin"),

    getAdminDashboard

);
router.get(

    "/users",

    protect,

    authorize("admin"),

    getUsers

);

router.put(

    "/users/:id",

    protect,

    authorize("admin"),

    updateUserRole

);

router.delete(

    "/users/:id",

    protect,

    authorize("admin"),

    deleteUser

);

module.exports = router;