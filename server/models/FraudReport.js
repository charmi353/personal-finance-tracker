const mongoose = require("mongoose");

const fraudReportSchema = new mongoose.Schema(
{
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    reason: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Reviewed"],
        default: "Pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("FraudReport", fraudReportSchema);