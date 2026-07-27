import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ModeratorDashboard() {

    const [stats, setStats] = useState({
        totalTickets: 0,
        openTickets: 0,
        totalFraudReports: 0,
        pendingReviews: 0
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        fetchDashboard();

    }, []);



    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");


            const response = await api.get(
                "/moderator/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setStats(response.data);


        } catch (error) {

            console.log(error);

            setError(
                "Unable to load moderator dashboard"
            );


        } finally {

            setLoading(false);

        }

    };



    return (

        <>

            <Navbar />


            <div className="flex bg-slate-100 min-h-screen">


                <Sidebar />


                <div className="flex-1 p-8">


                    <div className="mb-8">


                        <h1 className="text-4xl font-bold text-slate-800">
                            Moderator Dashboard
                        </h1>


                        <p className="text-gray-500 mt-2">
                            Welcome! Monitor support requests and suspicious activities.
                        </p>


                    </div>



                    {loading && (

                        <p className="text-blue-600 text-lg">
                            Loading dashboard...
                        </p>

                    )}



                    {error && (

                        <p className="text-red-600 text-lg">
                            {error}
                        </p>

                    )}




                    {!loading && !error && (

                        <>


                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


                                <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-6">

                                    <h2 className="text-lg">
                                        Total Tickets
                                    </h2>

                                    <h1 className="text-4xl font-bold mt-4">
                                        {stats.totalTickets}
                                    </h1>

                                </div>




                                <div className="bg-yellow-500 text-white rounded-2xl shadow-lg p-6">

                                    <h2 className="text-lg">
                                        Open Tickets
                                    </h2>

                                    <h1 className="text-4xl font-bold mt-4">
                                        {stats.openTickets}
                                    </h1>

                                </div>




                                <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6">

                                    <h2 className="text-lg">
                                        Fraud Reports
                                    </h2>

                                    <h1 className="text-4xl font-bold mt-4">
                                        {stats.totalFraudReports}
                                    </h1>

                                </div>




                                <div className="bg-green-600 text-white rounded-2xl shadow-lg p-6">

                                    <h2 className="text-lg">
                                        Pending Reviews
                                    </h2>

                                    <h1 className="text-4xl font-bold mt-4">
                                        {stats.pendingReviews}
                                    </h1>

                                </div>


                            </div>





                            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">


                                <h2 className="text-2xl font-semibold mb-6">
                                    Moderator Responsibilities
                                </h2>



                                <ul className="list-disc ml-6 space-y-3 text-gray-700">


                                    <li>
                                        Review user support tickets.
                                    </li>


                                    <li>
                                        Monitor suspicious financial activities.
                                    </li>


                                    <li>
                                        Verify fraud reports.
                                    </li>


                                    <li>
                                        Approve or reject reported issues.
                                    </li>


                                    <li>
                                        Help maintain a safe financial platform.
                                    </li>


                                </ul>


                            </div>


                        </>

                    )}


                </div>


            </div>


        </>

    );

}


export default ModeratorDashboard;