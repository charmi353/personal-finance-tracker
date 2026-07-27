import { useEffect } from "react";
import socket from "../services/socket";

function Notification() {

    useEffect(() => {

        console.log("✅ Notification Component Loaded");

        const userId = localStorage.getItem("userId");

        console.log("UserId:", userId);

        if (userId) {

            console.log("📤 Sending joinRoom");

            socket.emit("joinRoom", userId);

        }

        socket.on("notification", (data) => {

            console.log("📩 Notification Received:", data);

            alert(data.message);

        });

        return () => {

            socket.off("notification");

        };

    }, []);

    return null;
}

export default Notification;