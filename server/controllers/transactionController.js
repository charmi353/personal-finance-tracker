const Transaction = require("../models/Transaction");
const logActivity = require("../utils/logActivity");
const Budget = require("../models/Budget");
const addTransaction = async (req, res) => {

    try {

        const { title, amount, type, category, date } = req.body;

        const receipt = req.file ? req.file.filename : "";

        const transaction = await Transaction.create({

            user: req.user.id,

            title,

            amount,

            type,

            category,

            receipt,

            date

        });
        await logActivity(

    req.user.id,

    "Transaction",

    `Added ${title}`

);

        res.status(201).json({

            message: "Transaction Added Successfully",

            transaction

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
const getTransactions = async (req, res) => {

    try {

        const { search, type, category } = req.query;

        let filter = {

            user: req.user.id

        };

        if (search) {

            filter.title = {

                $regex: search,

                $options: "i"

            };

        }

        if (type) {

            filter.type = type;

        }

        if (category) {

            filter.category = category;

        }

        const transactions = await Transaction.find(filter)

            .sort({ createdAt: -1 });

        res.status(200).json(transactions);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
const updateTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        // Check if transaction belongs to logged-in user
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );
        await logActivity(

    req.user.id,

    "Transaction",

    `Updated ${updatedTransaction.title}`

);

        res.status(200).json({
            message: "Transaction Updated Successfully",
            updatedTransaction
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const deleteTransaction = async (req, res) => {

    try {

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        await Transaction.findByIdAndDelete(req.params.id);
        await logActivity(

    req.user.id,

    "Transaction",

    `Deleted ${transaction.title}`

);
        res.status(200).json({
            message: "Transaction Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getDashboardSummary = async (req, res) => {
    try {

        const transactions = await Transaction.find({
            user: req.user.id
        });

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((transaction) => {

            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            } else {
                totalExpense += transaction.amount;
            }

        });

        const balance = totalIncome - totalExpense;
        const currentDate = new Date();

const currentMonth = currentDate.getMonth() + 1;

const currentYear = currentDate.getFullYear();

const budget = await Budget.findOne({

    user: req.user.id,

    month: currentMonth,

    year: currentYear

});

let budgetAmount = 0;

let remainingBudget = 0;

let budgetPercentage = 0;

if (budget) {

    budgetAmount = budget.amount;

    remainingBudget = budget.amount - totalExpense;

    budgetPercentage = (totalExpense / budget.amount) * 100;

}
      res.status(200).json({

    totalIncome,

    totalExpense,

    balance,

    totalTransactions: transactions.length,

    budgetAmount,

    remainingBudget,

    budgetPercentage

});  

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const getMonthlyStats = async (req, res) => {

    try {

        const transactions = await Transaction.find({
            user: req.user.id
        });

        const monthlyData = {};

        transactions.forEach((item) => {

            const date = new Date(item.date);

            const month = date.toLocaleString("default", {
                month: "short"
            });

            if (!monthlyData[month]) {

                monthlyData[month] = {
                    month,
                    income: 0,
                    expense: 0
                };

            }

            if (item.type === "income") {

                monthlyData[month].income += item.amount;

            } else {

                monthlyData[month].expense += item.amount;

            }

        });

        res.status(200).json(Object.values(monthlyData));

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
module.exports = {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getDashboardSummary,
    getMonthlyStats

};