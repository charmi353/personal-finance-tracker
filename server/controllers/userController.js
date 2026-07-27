const User = require("../models/User");

// Admin - Get All Users
const getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Admin - Delete User
const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getAllUsers,
    deleteUser
};