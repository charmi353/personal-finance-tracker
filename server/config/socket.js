const socketIO = require("socket.io");

let io;

const initSocket = (server) => {

    io = socketIO(server, {

        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }

    });


    io.on("connection", (socket) => {

        console.log("✅ User Connected:", socket.id);


        socket.on("joinRoom", (userId) => {

            console.log("✅ joinRoom Received:", userId);

            socket.join(userId);

            console.log("✅ Joined Room:", userId);

        });


        socket.on("disconnect", () => {

            console.log("❌ User Disconnected");

        });

    });

};


module.exports = {
    initSocket
};