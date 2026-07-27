const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    assetName: {
        type: String,
        required: true
    },

    assetType: {
        type: String,
        required: true
    },

    value: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Portfolio", portfolioSchema);