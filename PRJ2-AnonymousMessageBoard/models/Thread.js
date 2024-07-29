const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
	text: String,
	delete_password: String,
	created_on: { type: Date, default: Date.now },
	reported: { type: Boolean, default: false },
});

const threadSchema = new mongoose.Schema({
	board: String,
	text: String,
	delete_password: String,
	created_on: { type: Date, default: Date.now },
	bumped_on: { type: Date, default: Date.now },
	reported: { type: Boolean, default: false },
	replies: { type: [replySchema], default: [] },
	replycount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Thread", threadSchema);
