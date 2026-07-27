import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditTransaction() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        amount: "",
        type: "",
        category: ""
    });

    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/transactions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const transaction = response.data.find(
                (item) => item._id === id
            );

            if (transaction) {
                setForm(transaction);
            }

        } catch (error) {

            console.log(error);

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

            await api.put(
                `/transactions/${id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Transaction Updated Successfully");

            navigate("/transactions");

        } catch (error) {

            console.log(error);

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
                            Edit Transaction
                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            <div>

                                <label className="block mb-2 font-medium">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                                    <input
                                        type="text"
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold shadow-lg transition"
                            >
                                Update Transaction
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}

export default EditTransaction;