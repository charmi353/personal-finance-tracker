import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"],
    withCredentials: true,
});

socket.on("connect", () => {
    console.log("✅ Socket Connected:", socket.id);
});

socket.on("connect_error", (error) => {
    console.error("❌ Socket Error:", error.message);
});

socket.on("disconnect", () => {
    console.log("❌ Socket Disconnected");
});

export default socket;