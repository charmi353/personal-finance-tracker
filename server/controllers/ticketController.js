const SupportTicket = require("../models/SupportTicket");

const createTicket = async (req, res) => {

    try {

        console.log("Logged In User:", req.user);

        const ticket = await SupportTicket.create({

            user: req.user.id,

            subject: req.body.subject,

            description: req.body.description,

            priority: req.body.priority

        });

        res.status(201).json({
            message: "Support Ticket Created Successfully",
            ticket
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createTicket
};