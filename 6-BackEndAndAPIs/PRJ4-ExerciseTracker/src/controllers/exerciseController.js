const Exercise = require("../models/Exercise");
const User = require("../models/User");
const moment = require("moment-timezone");

const displayDateUTC = (date) => {
	const systemTimezone = moment.tz.guess();
	const utcDateString = moment(date)
		.tz(systemTimezone)
		.format("ddd MMM DD YYYY");
	return utcDateString;
};

const convertDate = (date) => {
	const inputTime = moment(date, "YYYY-MM-DD HH:mm:ss");
	return inputTime.toDate();
};

exports.addExercise = (req, res) => {
	const { description, duration, date } = req.body;
	const userId = req.params._id;

	User.findById(userId)
		.then((user) => {
			const newExercise = new Exercise({
				userId,
				description,
				duration,
				date: date ? new Date(convertDate(date)) : new Date(),
			});

			newExercise
				.save()
				.then((exercise) => {
					res.json({
						username: user.username,
						_id: user._id,
						description: exercise.description,
						duration: exercise.duration,
						date: displayDateUTC(exercise.date),
					});
				})
				.catch((err) => {
					res.status(400).json({ error: "Error creating exercise" });
				});
		})
		.catch((err) => {
			res.status(400).json({ error: "User not found" });
		});
};

exports.getExerciseLog = (req, res) => {
	const userId = req.params._id;
	const { from, to, limit } = req.query;

	User.findById(userId)
		.then((user) => {
			let query = { userId };

			if (from || to) {
				query.date = {};
				if (from) query.date.$gte = new Date(convertDate(from));
				if (to) query.date.$lte = new Date(convertDate(to));
			}

			Exercise.find(query)
				.limit(parseInt(limit))
				.then((exercises) => {
					res.json({
						username: user.username,
						_id: user._id,
						from: from ? new Date(from).toDateString() : undefined,
						to: to ? new Date(to).toDateString() : undefined,
						limit: limit ? parseInt(limit) : undefined,
						count: exercises.length,
						log: exercises.map((exercise) => ({
							description: exercise.description,
							duration: exercise.duration,
							date: displayDateUTC(exercise.date),
						})),
					});
				})
				.catch((err) => {
					res.status(400).json({ error: "Error fetching exercises" });
				});
		})
		.catch((err) => {
			res.status(400).json({ error: "User not found" });
		});
};
