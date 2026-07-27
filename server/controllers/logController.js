const Log = require("../models/Log");

const getLogs = async (req, res) => {

    try {

        const logs = await Log.find({
            user: req.user.id
        })
        .sort({ createdAt: -1 });

        res.status(200).json(logs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getLogs
};