const SupportTicket = require("../models/SupportTicket");
const FraudReport = require("../models/FraudReport");


// Dashboard
const getModeratorDashboard = async (req,res)=>{

    try{

        const totalTickets = await SupportTicket.countDocuments();

        const openTickets = await SupportTicket.countDocuments({
            status:"Open"
        });

        const totalFraudReports = await FraudReport.countDocuments();

        const pendingReviews = await FraudReport.countDocuments({
            status:"Pending"
        });


        res.json({
            totalTickets,
            openTickets,
            totalFraudReports,
            pendingReviews
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Get Tickets
const getTickets = async(req,res)=>{

    try{

        const tickets = await SupportTicket
        .find()
        .populate("user","name email");


        res.json(tickets);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Update Ticket
const updateTicket = async(req,res)=>{

    try{

        const ticket = await SupportTicket.findByIdAndUpdate(

            req.params.id,

            {
                status:req.body.status
            },

            {
                new:true
            }

        );


        res.json(ticket);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Get Fraud Reports
const getFraudReports = async(req,res)=>{

    try{

        const reports = await FraudReport
        .find()
        .populate("user","name email")
        .populate("transaction");


        res.json(reports);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Update Fraud Report
const updateFraudReport = async(req,res)=>{

    try{

        const report = await FraudReport.findByIdAndUpdate(

            req.params.id,

            {
                status:req.body.status
            },

            {
                new:true
            }

        );


        res.json(report);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



module.exports = {

    getModeratorDashboard,
    getTickets,
    updateTicket,
    getFraudReports,
    updateFraudReport

};