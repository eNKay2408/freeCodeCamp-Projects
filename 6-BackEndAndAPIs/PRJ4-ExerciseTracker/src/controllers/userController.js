const User = require("../models/User");

exports.createUser = (req, res) => {
	const newUser = new User({ username: req.body.username });

	newUser
		.save()
		.then((user) => {
			res.json({ username: user.username, _id: user._id });
		})
		.catch((err) => {
			res.status(400).json({ error: "Username already exists" });
		});
};

exports.getAllUsers = (req, res) => {
	User.find({})
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.status(400).json({ error: "Error fetching users" });
		});
};
