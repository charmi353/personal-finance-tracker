const User = require("../models/User");

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

const updateProfile = async (req, res) => {

    try {

        const { name, currency } = req.body;

        const user = await User.findById(req.user.id);

        user.name = name;
        user.currency = currency;

        await user.save();

        res.json({
            message: "Profile Updated Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

module.exports = {
    getProfile,
    updateProfile
};