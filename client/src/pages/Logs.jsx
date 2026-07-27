import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Logs() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        fetchLogs();

    }, []);

    const fetchLogs = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/logs", {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            setLogs(response.data);

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

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold text-slate-800">

                            Activity Logs

                        </h1>

                        <p className="text-gray-500 mt-2">

                            View all activities performed in your account.

                        </p>

                    </div>

                    <div className="grid gap-5">

                        {logs.length === 0 ? (

                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

                                <h2 className="text-2xl font-semibold">

                                    No Activity Found

                                </h2>

                            </div>

                        ) : (

                            logs.map((log) => (

                                <div
                                    key={log._id}
                                    className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500"
                                >

                                    <div className="flex justify-between">

                                        <div>

                                            <h2 className="text-xl font-bold">

                                                {log.action}

                                            </h2>

                                            <p className="text-gray-600 mt-2">

                                                {log.description}

                                            </p>

                                        </div>

                                        <div className="text-right text-gray-500">

                                            {new Date(log.createdAt).toLocaleString()}

                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

        </>

    );

}

export default Logs;