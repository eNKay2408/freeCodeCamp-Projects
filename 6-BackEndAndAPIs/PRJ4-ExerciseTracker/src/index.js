const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const userRouters = require("./routes/userRoutes");
const exerciseRouters = require("./routes/exerciseRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

connectDB();
app.use("/api/users", userRouters);
app.use("/api/users", exerciseRouters);

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
