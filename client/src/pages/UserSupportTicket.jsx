import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function UserSupportTicket() {

    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/tickets",
                {
                    subject,
                    description,
                    priority
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Support Ticket Created Successfully");

            setSubject("");
            setDescription("");
            setPriority("Medium");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create support ticket"
            );

        }

    };

    return (

        <>
            <Navbar />

            <div className="flex bg-slate-100 min-h-screen">

                <Sidebar />

                <div className="flex-1 p-8">

                    <h1 className="text-4xl font-bold text-slate-800">
                        Create Support Ticket
                    </h1>

                    <p className="text-gray-500 mt-2 mb-8">
                        Submit your issue to the support team.
                    </p>

                    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl">

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>

                                <label className="block mb-2 font-medium">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) =>
                                        setSubject(e.target.value)
                                    }
                                    placeholder="Enter issue subject"
                                    className="w-full border rounded-lg p-3"
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Description
                                </label>

                                <textarea
                                    rows="5"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Describe your issue"
                                    className="w-full border rounded-lg p-3"
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Priority
                                </label>

                                <select
                                    value={priority}
                                    onChange={(e) =>
                                        setPriority(e.target.value)
                                    }
                                    className="w-full border rounded-lg p-3"
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>

                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                Submit Ticket
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}

export default UserSupportTicket;