const Portfolio = require("../models/Portfolio");

// Add Asset
const createPortfolio = async (req, res) => {
    try {

        const { assetName, assetType, value } = req.body;

        const portfolio = await Portfolio.create({
            user: req.user.id,
            assetName,
            assetType,
            value
        });

        res.status(201).json(portfolio);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Assets
const getPortfolios = async (req, res) => {

    try {

        const portfolios = await Portfolio.find({
            user: req.user.id
        });

        res.status(200).json(portfolios);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update Asset
const updatePortfolio = async (req, res) => {

    try {

        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({
                message: "Asset not found"
            });
        }

        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedPortfolio);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Asset
const deletePortfolio = async (req, res) => {

    try {

        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({
                message: "Asset not found"
            });
        }

        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        await Portfolio.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Asset Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createPortfolio,
    getPortfolios,
    updatePortfolio,
    deletePortfolio
};