const app = require("./app");
const connectDB = require("./config/db");
const { initSocket } = require("./config/socket");
connectDB();
const PORT = process.env.PORT || 5000;
const server = require("http").createServer(app);
initSocket(server);
server.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );

});