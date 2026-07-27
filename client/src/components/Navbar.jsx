import { FaWallet, FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        navigate("/login");

    };

    return (

        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            <div className="flex items-center gap-3">

                <FaWallet className="text-3xl text-blue-600" />

                <h1 className="text-2xl font-bold text-slate-800">
                    Finance Tracker
                </h1>

            </div>

            <div className="flex items-center gap-6">

                <FaBell className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 transition" />
                <FaUserCircle
    className="text-3xl text-gray-700 cursor-pointer hover:text-blue-600 transition"
    onClick={() => navigate("/profile")}
/>
                
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;