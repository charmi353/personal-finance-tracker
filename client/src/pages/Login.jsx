import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            // Save login details
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("userId", response.data.user._id);

            alert(response.data.message);

            if (response.data.role === "admin") {

                navigate("/admin");

            }
            else if (response.data.role === "moderator") {

                navigate("/moderator");

            }
            else {

                navigate("/dashboard");

            }

        } catch (error) {

            console.log(error.response?.data);

            alert(error.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center text-slate-800">
                    Personal Finance Tracker
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Welcome Back 👋
                </p>

                <form onSubmit={handleLogin} className="space-y-5">

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="w-full mt-3 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                    Register
                </button>

            </div>

        </div>

    );

}

export default Login;