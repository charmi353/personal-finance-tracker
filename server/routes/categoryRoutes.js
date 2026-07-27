const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {

    getCategories,
    addCategory,
    deleteCategory

} = require("../controllers/categoryController");

router.get(
    "/",
    protect,
    
    getCategories
);

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    addCategory
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteCategory
);

module.exports = router;