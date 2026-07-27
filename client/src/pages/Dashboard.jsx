import { useEffect, useState } from "react";
import api from "../services/api";
import SummaryCard from "../components/SummaryCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FinancePieChart from "../components/PieChart";
import FinanceBarChart from "../components/BarChart";
import BudgetCard from "../components/BudgetCard";

function Dashboard() {

    const navigate = useNavigate();

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        totalTransactions: 0,
        budgetAmount: 0,
        remainingBudget: 0,
        budgetPercentage: 0
    });

    const [transactions, setTransactions] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [budget, setBudget] = useState(0);
    const [portfolioValue, setPortfolioValue] = useState(0);

    useEffect(() => {
        fetchSummary();
        fetchTransactions();
        fetchMonthlyStats();
        fetchBudget();
        fetchPortfolioValue();
    }, []);

    const fetchSummary = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/transactions/summary", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSummary(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchTransactions = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/transactions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTransactions(response.data.slice(0, 5));

        } catch (error) {

            console.log(error);

        }

    };

    const fetchMonthlyStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/transactions/monthly-stats", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMonthlyData(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchBudget = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/budgets", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.length > 0) {
                setBudget(response.data[response.data.length - 1].amount);
            } else {
                setBudget(0);
            }

        } catch (error) {

            console.log(error);

        }

    };

    const fetchPortfolioValue = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/portfolios", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const total = response.data.reduce(
                (sum, item) => sum + item.value,
                0
            );

            setPortfolioValue(total);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <>
            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-6">

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold text-slate-800">
                            Dashboard
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Welcome back! Here's an overview of your finances.
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-5 mb-6">

                        <h2 className="text-xl font-semibold">
                            Today
                        </h2>

                        <p className="text-gray-600 mt-2">
                            {new Date().toLocaleDateString()}
                        </p>

                    </div>
                                        {/* Quick Actions */}

                    <div className="flex flex-wrap gap-4 mt-6 mb-8">

                        <button
                            onClick={() => navigate("/add-transaction")}
                            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
                        >
                            + Add Transaction
                        </button>

                        <button
                            onClick={() => navigate("/budgets")}
                            className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition shadow-md"
                        >
                            + Budget
                        </button>

                        <button
                            onClick={() => navigate("/transactions")}
                            className="bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition shadow-md"
                        >
                            View Transactions
                        </button>

                        <button
                            onClick={() => navigate("/portfolio")}
                            className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition shadow-md"
                        >
                            Portfolio
                        </button>

                        <button
                            onClick={() => navigate("/profile")}
                            className="bg-orange-600 text-white px-5 py-3 rounded-xl hover:bg-orange-700 transition shadow-md"
                        >
                            Profile
                        </button>

                    </div>

                    {/* Summary Cards */}

                    <div className="flex flex-wrap gap-6 mt-6">

                        <SummaryCard
                            title="Balance"
                            value={`₹${summary.balance}`}
                        />

                        <SummaryCard
                            title="Income"
                            value={`₹${summary.totalIncome}`}
                        />

                        <SummaryCard
                            title="Expense"
                            value={`₹${summary.totalExpense}`}
                        />

                        <SummaryCard
                            title="Transactions"
                            value={summary.totalTransactions}
                        />

                        <SummaryCard
                            title="Portfolio Value"
                            value={`₹${portfolioValue}`}
                        />

                        <BudgetCard
                            budget={budget}
                            spent={summary.totalExpense}
                        />

                    </div>

                    {/* Financial Overview */}

                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        <div className="bg-green-100 rounded-xl p-5 shadow">

                            <h3 className="text-lg font-bold text-green-700">
                                Total Income
                            </h3>

                            <p className="text-3xl font-bold mt-2">
                                ₹{summary.totalIncome}
                            </p>

                        </div>

                        <div className="bg-red-100 rounded-xl p-5 shadow">

                            <h3 className="text-lg font-bold text-red-700">
                                Total Expense
                            </h3>

                            <p className="text-3xl font-bold mt-2">
                                ₹{summary.totalExpense}
                            </p>

                        </div>

                        <div className="bg-blue-100 rounded-xl p-5 shadow">

                            <h3 className="text-lg font-bold text-blue-700">
                                Current Balance
                            </h3>

                            <p className="text-3xl font-bold mt-2">
                                ₹{summary.balance}
                            </p>

                        </div>

                    </div>

                    {/* Budget Status */}

                    <div
                        className={`mt-6 rounded-2xl p-6 text-white shadow-lg ${
                            summary.budgetPercentage >= 100
                                ? "bg-red-600"
                                : summary.budgetPercentage >= 80
                                ? "bg-yellow-500"
                                : "bg-green-600"
                        }`}
                    >

                        <h2 className="text-2xl font-bold">
                            Budget Status
                        </h2>

                        <div className="mt-4 grid md:grid-cols-3 gap-6">

                            <div>

                                <p className="text-sm">
                                    Budget
                                </p>

                                <h2 className="text-3xl font-bold">
                                    ₹{summary.budgetAmount}
                                </h2>

                            </div>

                            <div>

                                <p className="text-sm">
                                    Remaining
                                </p>

                                <h2 className="text-3xl font-bold">
                                    ₹{summary.remainingBudget}
                                </h2>

                            </div>

                            <div>

                                <p className="text-sm">
                                    Used
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {summary.budgetPercentage.toFixed(1)}%
                                </h2>

                            </div>

                        </div>

                        <div className="mt-6 text-xl font-bold">

                            {summary.budgetPercentage >= 100
                                ? "🚨 Budget Exceeded"
                                : summary.budgetPercentage >= 80
                                ? "⚠️ You are close to your budget limit"
                                : "✅ Your budget is under control"}

                        </div>

                    </div>
                                        {/* Charts Section */}

                    <div
                        className="flex gap-8 mt-8 flex-wrap lg:flex-nowrap"
                    >

                        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">

                            <h2 className="text-2xl font-bold text-slate-800 mb-5">
                                Income vs Expense
                            </h2>

                            <FinancePieChart
                                income={summary.totalIncome}
                                expense={summary.totalExpense}
                            />

                        </div>

                        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">

                            <h2 className="text-2xl font-bold text-slate-800 mb-5">
                                Recent Transactions
                            </h2>

                            <table className="w-full">

                                <thead>

                                    <tr className="bg-slate-800 text-white">

                                        <th className="py-3 rounded-l-xl">
                                            Title
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th className="rounded-r-xl">
                                            Category
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        transactions.length > 0 ? (

                                            transactions.map((item) => (

                                                <tr key={item._id}>

                                                    <td className="py-4 text-center font-medium">
                                                        {item.title}
                                                    </td>

                                                    <td className="text-center font-semibold">
                                                        ₹{item.amount}
                                                    </td>

                                                    <td className="text-center">

                                                        <span
                                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                                item.type === "income"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                        >
                                                            {item.type}
                                                        </span>

                                                    </td>

                                                    <td className="text-center">
                                                        {item.category}
                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center py-8 text-gray-500"
                                                >
                                                    No Transactions Found
                                                </td>

                                            </tr>

                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* Monthly Report */}

                    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                        <h2 className="text-2xl font-bold text-slate-800 mb-5">
                            Monthly Income & Expense
                        </h2>

                        <FinanceBarChart
                            data={monthlyData}
                        />

                    </div>

                    {/* Recent Activity */}

                    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                        <h2 className="text-2xl font-bold text-slate-800 mb-5">
                            Recent Activity
                        </h2>

                        {
                            transactions.length > 0 ? (

                                transactions.map((item) => (

                                    <div
                                        key={item._id}
                                        className="border-b py-4"
                                    >

                                        <h3 className="font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600">
                                            ₹{item.amount} • {item.category}
                                        </p>

                                        <small className="text-gray-400">
                                            {new Date(item.date).toLocaleDateString()}
                                        </small>

                                    </div>

                                ))

                            ) : (

                                <p className="text-gray-500">
                                    No Recent Activity
                                </p>

                            )
                        }

                    </div>

                    {/* Footer */}

                    <footer className="mt-10 border-t pt-6 text-center text-gray-500">

                        <h3 className="font-semibold">
                            Personal Finance Tracker
                        </h3>

                        <p className="mt-2">
                            MERN Stack Project
                        </p>

                        <p className="mt-1">
                            © 2026 All Rights Reserved
                        </p>

                    </footer>

                </div>

            </div>

        </>

    );

}

export default Dashboard;