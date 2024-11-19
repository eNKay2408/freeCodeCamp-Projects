"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const apiRoutes = require("./routes/api.js");

const app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use(cors({ origin: "*" })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	helmet({
		frameguard: { action: "deny" },
		dnsPrefetchControl: { allow: false },
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'"],
				styleSrc: ["'self'"],
			},
		},
	})
);

//Index page (static HTML)
app.route("/").get(function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// Connect to the database
const mongoose = require("mongoose");
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((err) => {
		console.error("Error connecting to the database", err);
	});

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
	res.status(404).type("text").send("Not Found");
});

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app; //for testing
