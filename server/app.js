const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json());
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const logRoutes = require("./routes/logRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const moderatorRoutes = require("./routes/moderatorRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
app.use("/api/tickets", ticketRoutes);
app.use("/api/moderator", moderatorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/categories", categoryRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Personal Finance API");
});
module.exports = app;