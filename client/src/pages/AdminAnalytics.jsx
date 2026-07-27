import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


function AdminAnalytics(){


    const userData = [

        {
            name:"Users",
            count:120
        },

        {
            name:"Transactions",
            count:350
        },

        {
            name:"Budgets",
            count:80
        }

    ];



    const categoryData = [

        {
            name:"Food",
            value:40
        },

        {
            name:"Travel",
            value:25
        },

        {
            name:"Shopping",
            value:35
        }

    ];



    return(

        <>


        <Navbar/>


        <div className="flex bg-slate-100 min-h-screen">


            <Sidebar/>



            <div className="flex-1 p-8">


                <h1 className="text-3xl font-bold mb-8">

                    Admin Analytics

                </h1>




                <div className="grid md:grid-cols-2 gap-8">



                    <div className="bg-white p-6 rounded-xl shadow">


                        <h2 className="text-xl font-bold mb-5">

                            System Overview

                        </h2>


                        <ResponsiveContainer width="100%" height={300}>


                            <BarChart data={userData}>


                                <XAxis dataKey="name"/>

                                <YAxis/>

                                <Tooltip/>


                                <Bar
                                    dataKey="count"
                                />


                            </BarChart>


                        </ResponsiveContainer>


                    </div>






                    <div className="bg-white p-6 rounded-xl shadow">


                        <h2 className="text-xl font-bold mb-5">

                            Expense Categories

                        </h2>



                        <ResponsiveContainer width="100%" height={300}>


                            <PieChart>


                                <Pie

                                    data={categoryData}

                                    dataKey="value"

                                    nameKey="name"

                                    outerRadius={100}

                                >


                                {
                                    categoryData.map(
                                    (entry,index)=>(

                                        <Cell key={index}/>

                                    ))
                                }


                                </Pie>


                                <Tooltip/>


                            </PieChart>


                        </ResponsiveContainer>



                    </div>



                </div>



            </div>



        </div>


        </>


    );


}


export default AdminAnalytics;