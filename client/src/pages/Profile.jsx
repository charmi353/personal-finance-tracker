import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaUserCircle, FaEnvelope, FaGlobe } from "react-icons/fa";

function Profile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currency, setCurrency] = useState("INR");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setName(response.data.name);
            setEmail(response.data.email);
            setCurrency(response.data.currency);

        } catch (error) {

            console.log(error);

        }

    };

    const saveProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                "/profile",
                {
                    name,
                    currency
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Profile Updated Successfully");

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

                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-40 flex justify-center items-center">

                            <FaUserCircle className="text-white text-8xl" />

                        </div>

                        <div className="p-8">

                            <h1 className="text-3xl font-bold text-center text-slate-800">
                                My Profile
                            </h1>

                            <p className="text-center text-gray-500 mt-2">
                                Update your personal information.
                            </p>

                            <div className="mt-10 space-y-6">

                                <div>

                                    <label className="flex items-center gap-2 mb-2 font-semibold">

                                        <FaUserCircle />

                                        Full Name

                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />

                                </div>

                                <div>

                                    <label className="flex items-center gap-2 mb-2 font-semibold">

                                        <FaEnvelope />

                                        Email Address

                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        readOnly
                                        className="w-full bg-gray-100 border rounded-xl px-4 py-3 cursor-not-allowed"
                                    />

                                </div>

                                <div>

                                    <label className="flex items-center gap-2 mb-2 font-semibold">

                                        <FaGlobe />

                                        Currency

                                    </label>

                                    <select
                                        value={currency}
                                        onChange={(e) =>
                                            setCurrency(e.target.value)
                                        }
                                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="INR">₹ INR</option>
                                        <option value="USD">$ USD</option>
                                        <option value="EUR">€ EUR</option>
                                        <option value="GBP">£ GBP</option>
                                    </select>

                                </div>

                                <button
                                    onClick={saveProfile}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Profile;