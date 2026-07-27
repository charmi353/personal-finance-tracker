import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Transactions() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [category, setCategory] = useState("All");
    const [type, setType] = useState("All");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/transactions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTransactions(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteTransaction = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/transactions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Transaction Deleted Successfully");

            fetchTransactions();

        } catch (error) {

            console.log(error);

        }

    };

    const exportCSV = () => {

        const csv = Papa.unparse(transactions);

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = "transactions.csv";

        link.click();

    };

    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);

        doc.text("Personal Finance Report", 14, 20);

        const tableData = transactions.map((item) => [

            item.title,
            item.amount,
            item.type,
            item.category,
            item.date
                ? new Date(item.date).toLocaleDateString()
                : ""

        ]);

        autoTable(doc, {

            head: [["Title", "Amount", "Type", "Category", "Date"]],

            body: tableData,

            startY: 30

        });

        doc.save("transactions.pdf");

    };
    return (
    <>
        <Navbar />

        <div className="flex bg-slate-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">
                            Transactions
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View, search and manage your transactions.
                        </p>

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

                    <div className="flex flex-wrap gap-4">

                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded-xl px-4 py-3 w-72"
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        >
                            <option value="All">All Categories</option>
                            <option value="Salary">Salary</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Others">Others</option>
                        </select>

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        >
                            <option value="All">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        />

                    </div>

                    <div className="flex flex-wrap gap-4 mt-6">

                        <button
                            onClick={() => navigate("/add-transaction")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"
                        >
                            + Add Transaction
                        </button>

                        <button
                            onClick={exportCSV}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow"
                        >
                            Export CSV
                        </button>

                        <button
                            onClick={exportPDF}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl shadow"
                        >
                            Export PDF
                        </button>

                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {transactions
                        .filter((item) =>
                            item.title
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .filter(
                            (item) =>
                                category === "All" ||
                                item.category === category
                        )
                        .filter(
                            (item) =>
                                type === "All" ||
                                item.type === type
                        )
                        .filter((item) => {

                            if (!startDate && !endDate)
                                return true;

                            const transactionDate =
                                new Date(item.date);

                            if (
                                startDate &&
                                transactionDate < new Date(startDate)
                            )
                                return false;

                            if (
                                endDate &&
                                transactionDate > new Date(endDate)
                            )
                                return false;

                            return true;

                        })
                        .map((item) => (
                            <div
    key={item._id}
    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
>

    <h2 className="text-2xl font-bold text-slate-800 mb-4">
        {item.title}
    </h2>

    <p className="mb-2">
        <strong>Amount:</strong> ₹{item.amount}
    </p>

    <p className="mb-2">
        <strong>Category:</strong> {item.category}
    </p>

    <p className="mb-2">
        <strong>Date:</strong>{" "}
        {item.date
            ? new Date(item.date).toLocaleDateString()
            : "N/A"}
    </p>

    <p className="mb-4">

        <strong>Type:</strong>

        <span
            className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                item.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
            }`}
        >
            {item.type}
        </span>

    </p>

    {item.receipt && (

        <div className="mb-4">

            <strong>Receipt</strong>

            <img
                src={`http://localhost:5000/uploads/${item.receipt}`}
                alt="Receipt"
                className="mt-3 rounded-xl border w-full h-56 object-cover"
            />

        </div>

    )}

    <div className="flex gap-4">

        <button
            onClick={() =>
                navigate(`/edit-transaction/${item._id}`)
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
        >
            Edit
        </button>

        <button
            onClick={() =>
                deleteTransaction(item._id)
            }
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
            Delete
        </button>

    </div>

</div>

                    ))}

                </div>

            </div>

        </div>

    </>
);

}

export default Transactions;