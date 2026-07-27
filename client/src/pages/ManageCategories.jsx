import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ManageCategories() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {

        const token = localStorage.getItem("token");

        const res = await api.get("/categories", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        setCategories(res.data);

    };

    const addCategory = async () => {

        const token = localStorage.getItem("token");

        await api.post(
            "/categories",
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setName("");

        fetchCategories();

    };

    const deleteCategory = async (id) => {

        const token = localStorage.getItem("token");

        await api.delete(`/categories/${id}`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        fetchCategories();

    };

    return (

        <>
            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <h1 className="text-3xl font-bold mb-6">
                        Manage Categories
                    </h1>

                    <div className="flex gap-3 mb-6">

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Category Name"
                            className="border p-3 rounded-lg"
                        />

                        <button
                            onClick={addCategory}
                            className="bg-blue-600 text-white px-5 rounded-lg"
                        >
                            Add
                        </button>

                    </div>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-slate-800 text-white">

                                <th className="p-3">
                                    Category
                                </th>

                                <th className="p-3">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.map((item) => (

                                <tr key={item._id}>

                                    <td className="border p-3">
                                        {item.name}
                                    </td>

                                    <td className="border p-3">

                                        <button
                                            onClick={() => deleteCategory(item._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default ManageCategories;