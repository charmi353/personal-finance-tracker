import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/register",
                formData
            );

            alert(response.data.message);

            navigate("/login");

        } catch (error) {

            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);

            alert(error.response?.data?.message || "Registration Failed");

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center text-slate-800">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Join Personal Finance Tracker 💰
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full mt-3 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                    Login
                </button>

            </div>

        </div>
    );
};

export default Register;