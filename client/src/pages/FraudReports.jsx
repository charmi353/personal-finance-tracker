import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


function FraudReports(){

    const [reports,setReports] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        fetchReports();

    },[]);



    const fetchReports = async()=>{

        try{

            const token = localStorage.getItem("token");


            const response = await api.get(
                "/moderator/fraud",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            setReports(response.data);


        }catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };




    const reviewReport = async(id)=>{

        try{

            const token = localStorage.getItem("token");


            await api.put(
                `/moderator/fraud/${id}`,
                {
                    status:"Reviewed"
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            fetchReports();


        }catch(error){

            console.log(error);

        }

    };




    return(

        <>

        <Navbar/>


        <div className="flex bg-slate-100 min-h-screen">


            <Sidebar/>


            <div className="flex-1 p-8">


                <h1 className="text-4xl font-bold text-slate-800">
                    Fraud Reports
                </h1>


                <p className="text-gray-500 mt-2 mb-8">
                    Review suspicious transaction reports.
                </p>



                <div className="bg-white rounded-2xl shadow-lg p-6">


                {
                    loading ?

                    (

                    <p>
                        Loading reports...
                    </p>

                    )

                    :

                    (

                    <table className="w-full">


                    <thead>

                    <tr className="bg-slate-800 text-white">

                        <th className="p-3">
                            User
                        </th>

                        <th className="p-3">
                            Reason
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
                        reports.map((report)=>(


                        <tr
                        key={report._id}
                        className="border-b text-center"
                        >


                            <td className="p-3">
                                {report.user?.name || "User"}
                            </td>


                            <td className="p-3">
                                {report.reason}
                            </td>


                            <td className="p-3">
                                {report.status}
                            </td>



                            <td className="p-3">


                            {
                                report.status==="Pending" ?

                                (

                                <button

                                onClick={()=>reviewReport(report._id)}

                                className="bg-red-600 text-white px-4 py-2 rounded-lg"

                                >

                                Review

                                </button>

                                )

                                :

                                (

                                <span className="text-green-600 font-semibold">
                                    ✔ Reviewed
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


export default FraudReports;