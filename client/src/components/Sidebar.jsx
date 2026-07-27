import {
    FaHome,
    FaExchangeAlt,
    FaWallet,
    FaChartLine,
    FaUser,
    FaPlusCircle,
    FaClipboardList,
    FaUsers,
    FaFolderOpen,
    FaUserShield,
    FaHeadset,
    FaExclamationTriangle
} from "react-icons/fa";

import { FaChartPie } from "react-icons/fa";

import { NavLink } from "react-router-dom";


function Sidebar() {

    const role = localStorage.getItem("role");


    return (

        <div className="w-64 min-h-screen bg-slate-900 text-white shadow-lg">


            <div className="text-center py-8 border-b border-slate-700">

                <h2 className="text-xl font-semibold">
                    Menu
                </h2>

            </div>



            <nav className="mt-6 flex flex-col gap-2 px-4">



                {/* ================= ADMIN MENU ================= */}


                {
                    role === "admin" && (
                        <>

                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-600"
                                            : "hover:bg-slate-700"
                                    }`
                                }
                            >
                                <FaUserShield />
                                Admin Dashboard
                            </NavLink>



                            <NavLink
                                to="/admin/users"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-600"
                                            : "hover:bg-slate-700"
                                    }`
                                }
                            >
                                <FaUsers />
                                Manage Users
                            </NavLink>



                            <NavLink
                                to="/categories"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-600"
                                            : "hover:bg-slate-700"
                                    }`
                                }
                            >
                                <FaFolderOpen />
                                Categories
                            </NavLink>



                            <NavLink
                                to="/admin/analytics"
                                className={({isActive}) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-700"
                                    }`
                                }
                            >

                                <FaChartPie />

                                Analytics

                            </NavLink>



                            <hr className="border-slate-700 my-2" />

                        </>
                    )
                }




                {/* ================= MODERATOR MENU ================= */}



                {
                    role === "moderator" && (
                        <>

                            <NavLink
                                to="/moderator"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-600"
                                            : "hover:bg-slate-700"
                                    }`
                                }
                            >
                                <FaUserShield />
                                Moderator Dashboard
                            </NavLink>




                            <NavLink
                                to="/support"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-600"
                                            : "hover:bg-slate-700"
                                    }`
                                }
                            >
                                <FaHeadset />
                                Support Tickets
                            </NavLink>




                            <NavLink
                                to="/fraud"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-600"
                                            : "hover:bg-slate-700"
                                    }`
                                }
                            >
                                <FaExclamationTriangle />
                                Fraud Reports
                            </NavLink>



                            <hr className="border-slate-700 my-2" />

                        </>
                    )
                }




                {/* ================= USER MENU ================= */}



                {
                    role === "user" && (
                        <>

                            <NavLink
                                to="/support-ticket"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-600"
                                            : "hover:bg-slate-700"
                                    }`
                                }
                            >
                                <FaHeadset />
                                Support Tickets
                            </NavLink>



                            <hr className="border-slate-700 my-2" />

                        </>
                    )
                }






                {/* ================= COMMON MENU ================= */}



                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-700"
                        }`
                    }
                >
                    <FaHome />
                    Dashboard
                </NavLink>




                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-700"
                        }`
                    }
                >
                    <FaExchangeAlt />
                    Transactions
                </NavLink>




                <NavLink
                    to="/add-transaction"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-700"
                        }`
                    }
                >
                    <FaPlusCircle />
                    Add Transaction
                </NavLink>




                <NavLink
                    to="/budgets"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-700"
                        }`
                    }
                >
                    <FaWallet />
                    Budgets
                </NavLink>




                <NavLink
                    to="/portfolio"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-700"
                        }`
                    }
                >
                    <FaChartLine />
                    Portfolio
                </NavLink>




                <NavLink
                    to="/logs"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-700"
                        }`
                    }
                >
                    <FaClipboardList />
                    Activity Logs
                </NavLink>




                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-700"
                        }`
                    }
                >
                    <FaUser />
                    Profile
                </NavLink>



            </nav>


        </div>

    );

}


export default Sidebar;