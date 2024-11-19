const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB database");
	})
	.catch((err) => {
		console.log("Failed to connect to MongoDB database");
		console.log(err);
	});

const urlSchema = new mongoose.Schema({
	originalUrl: {
		type: String,
		required: true,
	},
});

urlSchema.plugin(AutoIncrement, {
	inc_field: "shortUrl",
});

module.exports = mongoose.model("Url", urlSchema);
