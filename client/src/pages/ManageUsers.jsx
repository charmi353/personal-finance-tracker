import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/admin/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const updateRole = async (id, role) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(

                `/admin/users/${id}`,

                {
                    role
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Role Updated Successfully");

            fetchUsers();

        } catch (error) {

            console.log(error);

            alert("Unable to update role");

        }

    };

    const deleteUser = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(

                `/admin/users/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("User Deleted Successfully");

            fetchUsers();

        } catch (error) {

            console.log(error);

            alert("Unable to delete user");

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
                            Manage Users
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View all users, update their roles and remove users.
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                        <table className="w-full">

                            <thead className="bg-slate-800 text-white">

                                <tr>

                                    <th className="p-4 text-left">
                                        Name
                                    </th>

                                    <th className="p-4 text-left">
                                        Email
                                    </th>

                                    <th className="p-4 text-center">
                                        Role
                                    </th>

                                    <th className="p-4 text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    users.length > 0 ?

                                    users.map((user) => (

                                        <tr
                                            key={user._id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-4">
                                                {user.name}
                                            </td>

                                            <td className="p-4">
                                                {user.email}
                                            </td>

                                            <td className="p-4 text-center">

                                                <select

                                                    value={user.role}

                                                    onChange={(e) =>
                                                        updateRole(
                                                            user._id,
                                                            e.target.value
                                                        )
                                                    }

                                                    className="border rounded-lg px-3 py-2"

                                                >

                                                    <option value="user">
                                                        User
                                                    </option>

                                                    <option value="moderator">
                                                        Moderator
                                                    </option>

                                                    <option value="admin">
                                                        Admin
                                                    </option>

                                                </select>

                                            </td>

                                            <td className="p-4 text-center">

                                                <button

                                                    onClick={() =>
                                                        deleteUser(user._id)
                                                    }

                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"

                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center p-8 text-gray-500"
                                        >

                                            No Users Found

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

export default ManageUsers;