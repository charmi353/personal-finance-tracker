import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
    FaUsers,
    FaMoneyBillWave,
    FaFolderOpen,
    FaWallet
} from "react-icons/fa";


function AdminDashboard() {


    const [stats, setStats] = useState({

        totalUsers: 0,
        totalTransactions: 0,
        totalCategories: 0,
        totalBudgets: 0,
        recentUsers: []

    });



    useEffect(() => {

        fetchAdminData();

    }, []);




    const fetchAdminData = async () => {


        try {


            const res = await api.get("/admin/dashboard");


            console.log("API DATA:", res.data);



            setStats({

                totalUsers: res.data.totalUsers || 0,

                totalTransactions:
                res.data.totalTransactions || 0,


                totalCategories:
                res.data.totalCategories || 0,


                totalBudgets:
                res.data.totalBudgets || 0,


                recentUsers:
                res.data.recentUsers || []

            });



        } catch(error) {


            console.log("ERROR:", error);


        }


    };





    return (

        <>

            <Navbar />


            <div className="flex bg-slate-100 min-h-screen">


                <Sidebar />



                <div className="flex-1 p-8">



                    <h1 className="text-4xl font-bold text-slate-800">

                        Admin Dashboard

                    </h1>



                    <p className="text-gray-500 mt-2 mb-8">

                        Manage your finance system from one place.

                    </p>





                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">



                        <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">

                            <FaUsers size={35}/>

                            <h2 className="mt-4 text-lg">

                                Total Users

                            </h2>


                            <h1 className="text-4xl font-bold mt-2">

                                {stats.totalUsers}

                            </h1>


                        </div>





                        <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg">


                            <FaMoneyBillWave size={35}/>


                            <h2 className="mt-4 text-lg">

                                Transactions

                            </h2>


                            <h1 className="text-4xl font-bold mt-2">

                                {stats.totalTransactions}

                            </h1>


                        </div>





                        <div className="bg-purple-600 text-white rounded-2xl p-6 shadow-lg">


                            <FaFolderOpen size={35}/>


                            <h2 className="mt-4 text-lg">

                                Categories

                            </h2>


                            <h1 className="text-4xl font-bold mt-2">

                                {stats.totalCategories}

                            </h1>


                        </div>





                        <div className="bg-orange-500 text-white rounded-2xl p-6 shadow-lg">


                            <FaWallet size={35}/>


                            <h2 className="mt-4 text-lg">

                                Budgets

                            </h2>


                            <h1 className="text-4xl font-bold mt-2">

                                {stats.totalBudgets}

                            </h1>


                        </div>



                    </div>






                    <div className="bg-white rounded-2xl shadow-lg mt-10 p-6">


                        <h2 className="text-2xl font-bold mb-6">

                            Recent Registered Users

                        </h2>





                        <table className="w-full">


                            <thead>


                                <tr className="bg-slate-800 text-white">


                                    <th className="p-3">

                                        Name

                                    </th>



                                    <th className="p-3">

                                        Email

                                    </th>



                                    <th className="p-3">

                                        Role

                                    </th>


                                </tr>


                            </thead>





                            <tbody>


                            {


                            stats.recentUsers.length > 0 ?


                            stats.recentUsers.map((user)=>(


                                <tr 

                                    key={user._id}

                                    className="border-b">


                                    <td className="p-3 text-center">

                                        {user.name}

                                    </td>



                                    <td className="p-3 text-center">

                                        {user.email}

                                    </td>



                                    <td className="p-3 text-center">

                                        {user.role}

                                    </td>


                                </tr>


                            ))



                            :



                            <tr>


                                <td 
                                colSpan="3"
                                className="p-5 text-center text-gray-500">


                                    No users found


                                </td>


                            </tr>



                            }



                            </tbody>


                        </table>



                    </div>



                </div>



            </div>


        </>


    );


}


export default AdminDashboard;