var express = require("express");
var cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

const upload = multer({ dest: "uploads/" });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No file uploaded" });
	}

	res.json({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size,
	});

	const filePath = path.join(__dirname, req.file.path);
	fs.unlink(filePath, (err) => {
		if (err) {
			console.error("Error deleting temporary file:", err);
		} else {
			console.log("Temporary file deleted successfully.");
		}
	});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Your app is listening on port " + port);
});
