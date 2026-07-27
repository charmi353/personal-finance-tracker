const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },

    status: {
        type: String,
        enum: ["Open", "In Progress", "Resolved"],
        default: "Open"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);