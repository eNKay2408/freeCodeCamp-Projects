require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/assets", express.static(process.cwd() + "/assets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({ origin: "*" }));

app.use(
	helmet({
		noSniff: true,
		xssFilter: true,
		noCache: true,
		frameguard: { action: "deny" },
		hidePoweredBy: { setTo: "PHP 7.4.3" },
	})
);

// Index page (static HTML)
app.route("/").get(function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);
	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

// 404 Not Found Middleware
app.use(function (req, res, next) {
	res.status(404).type("text").send("Not Found");
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
server.listen(portNum, () => {
	console.log(`Listening on port ${portNum}`);
});

module.exports = server; // For testing
