const Category = require("../models/Category");

// Get All Categories
const getCategories = async (req, res) => {

    try {

        const categories = await Category.find();

        res.status(200).json(categories);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Add Category
const addCategory = async (req, res) => {

    try {

        const category = await Category.create({
            name: req.body.name
        });

        res.status(201).json({
            message: "Category Added Successfully",
            category
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Category
const deleteCategory = async (req, res) => {

    try {

        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Category Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getCategories,
    addCategory,
    deleteCategory
};