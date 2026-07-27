import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function SupportTickets() {

    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchTickets();

    }, []);



    const fetchTickets = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/moderator/tickets",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            setTickets(response.data);


        } catch(error){

            console.log(error);

        } finally {

            setLoading(false);

        }

    };



    const resolveTicket = async (id) => {

        try {

            const token = localStorage.getItem("token");


            await api.put(
                `/moderator/tickets/${id}`,
                {
                    status:"Resolved"
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            fetchTickets();


        } catch(error){

            console.log(error);

        }

    };



    return (

        <>

        <Navbar />


        <div className="flex bg-slate-100 min-h-screen">

            <Sidebar />


            <div className="flex-1 p-8">


                <h1 className="text-4xl font-bold text-slate-800">
                    Support Tickets
                </h1>


                <p className="text-gray-500 mt-2 mb-8">
                    Review and resolve user issues.
                </p>



                <div className="bg-white rounded-2xl shadow-lg p-6">


                {
                    loading ? (

                        <p>
                            Loading tickets...
                        </p>

                    ) : (


                    <table className="w-full">


                    <thead>

                    <tr className="bg-slate-800 text-white">

                        <th className="p-3">
                            User
                        </th>

                        <th className="p-3">
                            Issue
                        </th>

                        <th className="p-3">
                            Status
                        </th>

                        <th className="p-3">
                            Action
                        </th>


                    </tr>

                    </thead>



                    <tbody>


                    {
                        tickets.map((ticket)=>(


                        <tr
                            key={ticket._id}
                            className="border-b text-center"
                        >


                            <td className="p-3">
                                {ticket.user?.name || "User"}
                            </td>


                            <td className="p-3">
                                {ticket.subject}
                            </td>


                            <td className="p-3">
                                {ticket.status}
                            </td>



                            <td className="p-3">


                            {
                                ticket.status !== "Resolved" ?


                                (

                                <button

                                onClick={() =>
                                    resolveTicket(ticket._id)
                                }

                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

                                >

                                Resolve

                                </button>

                                )


                                :

                                (

                                <span className="text-green-600 font-semibold">
                                    ✔ Completed
                                </span>

                                )


                            }


                            </td>


                        </tr>


                        ))

                    }


                    </tbody>


                    </table>


                    )

                }


                </div>


            </div>


        </div>


        </>

    );

}


export default SupportTickets;