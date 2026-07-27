import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


function AdminUsers(){

    const [users,setUsers] = useState([]);


    useEffect(()=>{

        fetchUsers();

    },[]);



    const fetchUsers = async()=>{

        try{

            const res = await api.get("/admin/users");

            setUsers(res.data);


        }catch(error){

            console.log(error);

        }

    };



    const updateRole = async(id,role)=>{


        try{


            await api.put(`/admin/users/${id}`,{

                role

            });


            fetchUsers();


        }catch(error){

            console.log(error);

        }


    };




    const deleteUser = async(id)=>{


        try{


            await api.delete(`/admin/users/${id}`);


            fetchUsers();


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


                <h1 className="text-3xl font-bold mb-6">

                    Manage Users

                </h1>



                <div className="bg-white rounded-xl shadow p-6">


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


                    <th className="p-3">
                        Actions
                    </th>


                </tr>

                </thead>



                <tbody>


                {
                    users.map((user)=>(


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




                        <td className="p-3 text-center">


                            <button

                            onClick={()=>updateRole(
                                user._id,
                                user.role==="admin"
                                ?"user"
                                :"admin"
                            )}

                            className="bg-blue-600 text-white px-3 py-2 rounded mr-2">


                            Change Role


                            </button>





                            <button

                            onClick={()=>deleteUser(user._id)}

                            className="bg-red-600 text-white px-3 py-2 rounded">


                            Delete


                            </button>


                        </td>



                    </tr>


                    ))
                }



                </tbody>


                </table>


                </div>


            </div>


        </div>


        </>


    );

}


export default AdminUsers;