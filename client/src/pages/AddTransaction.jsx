import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddTransaction() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: ""
    });

    const [receipt, setReceipt] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/categories", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCategories(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load categories");

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("amount", form.amount);
            formData.append("type", form.type);
            formData.append("category", form.category);
            formData.append("date", form.date);

            if (receipt) {
                formData.append("receipt", receipt);
            }

            await api.post("/transactions", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Transaction Added Successfully");

            navigate("/transactions");

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Error");

        }

    };

    return (
        <>
            <Navbar />

            <div className="flex bg-slate-100 min-h-screen">

                <Sidebar />

                <div className="flex-1 p-8">

                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

                        <h1 className="text-3xl font-bold text-slate-800 mb-8">
                            Add Transaction
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>

                                <label className="block mb-2 font-medium">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter transaction title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Enter amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                            </div>

                            <div className="grid grid-cols-2 gap-6">

                                <div>

                                    <label className="block mb-2 font-medium">
                                        Type
                                    </label>

                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>

                                </div>

                                <div>

                                    <label className="block mb-2 font-medium">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >

                                        <option value="">
                                            Select Category
                                        </option>

                                        {categories.map((item) => (

                                            <option
                                                key={item._id}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Upload Receipt
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setReceipt(e.target.files[0])}
                                    className="w-full border-2 border-dashed border-blue-300 rounded-xl p-4 cursor-pointer"
                                />

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
                            >
                                Save Transaction
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>
    );

}

export default AddTransaction;