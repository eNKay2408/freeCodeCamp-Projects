"use strict";

const Thread = require("../models/thread");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
	const saltRounds = 12;
	return bcrypt.hash(password, saltRounds);
};

module.exports = function (app) {
	app.post("/api/threads/:board", async (req, res) => {
		const { text, delete_password } = req.body;

		const hashedPassword = await hashPassword(delete_password);
		const board = req.params.board;

		try {
			const newThread = new Thread({
				board,
				text,
				delete_password: hashedPassword,
			});

			const savedThread = await newThread.save();
			const savedThreadObject = savedThread.toObject();

			delete savedThreadObject.delete_password;
			delete savedThreadObject.__v;

			res.json(savedThreadObject);
		} catch (err) {
			res.json({ error: "Unable to save thread" });
		}
	});

	app.post("/api/replies/:board", async (req, res) => {
		const { text, delete_password, thread_id } = req.body;
		const hashedPassword = await hashPassword(delete_password);

		try {
			const thread = await Thread.findById(thread_id);
			if (!thread) {
				res.json({ error: "Thread not found" });
			}

			const newReply = {
				text,
				delete_password: hashedPassword,
			};

			thread.replies.push(newReply);
			thread.bumped_on = new Date();
			thread.replycount = thread.replies.length;

			const savedThread = await thread.save();
			const savedThreadObject = savedThread.toObject();

			delete savedThreadObject.delete_password;
			delete savedThreadObject.__v;
			savedThreadObject.replies.forEach((reply) => {
				delete reply.delete_password;
			});

			res.json(savedThreadObject);
		} catch (err) {
			res.json({ error: "Unable to save reply" });
		}
	});

	app.get("/api/threads/:board", async (req, res) => {
		try {
			const threads = await Thread.find({ board: req.params.board })
				.sort({ bumped_on: -1 })
				.limit(10)
				.select("-delete_password -reported")
				.lean();

			if (!threads) {
				return res.json({ error: "Thread not found" });
			}

			threads.forEach((thread) => {
				thread.replies = thread.replies.slice(-3);
				thread.replies.forEach((reply) => {
					delete reply.delete_password;
					delete reply.reported;
				});
			});

			res.json(threads);
		} catch (err) {
			res.json({ error: "Unable to retrieve threads" });
		}
	});

	app.get("/api/replies/:board", async (req, res) => {
		try {
			const thread = await Thread.findById(req.query.thread_id)
				.select("-delete_password -reported")
				.lean();

			if (!thread || thread.board !== req.params.board) {
				return res.json({ error: "Thread not found" });
			}

			thread.replies.forEach((reply) => {
				delete reply.delete_password;
				delete reply.reported;
			});

			res.json(thread);
		} catch (err) {
			res.json({ error: "Unable to retrieve thread" });
		}
	});

	app.delete("/api/threads/:board", async (req, res) => {
		try {
			const { thread_id, delete_password } = req.body;
			const thread = await Thread.findById(thread_id);

			if (!thread || thread.board !== req.params.board) {
				return res.json({ error: "Thread not found" });
			}

			if (!bcrypt.compareSync(delete_password, thread.delete_password)) {
				return res.send("incorrect password");
			}

			await Thread.findByIdAndDelete(thread_id);

			res.send("success");
		} catch (err) {
			res.json({ error: "Unable to delete thread" });
		}
	});

	app.delete("/api/replies/:board", async (req, res) => {
		try {
			const { thread_id, reply_id, delete_password } = req.body;
			const thread = await Thread.findById(thread_id);

			if (!thread || thread.board !== req.params.board) {
				return res.json({ error: "Thread not found" });
			}

			const reply = thread.replies.id(reply_id);
			if (!reply) {
				return res.json({ error: "Reply not found" });
			}

			if (!bcrypt.compareSync(delete_password, reply.delete_password)) {
				return res.send("incorrect password");
			}

			reply.text = "[deleted]";
			thread.bumped_on = new Date();
			await thread.save();

			res.send("success");
		} catch (err) {
			res.json({ error: "Unable to delete reply" });
		}
	});

	app.put("/api/threads/:board", async (req, res) => {
		try {
			const thread = await Thread.findById(req.body.thread_id);

			if (!thread || thread.board !== req.params.board) {
				return res.json({ error: "Thread not found" });
			}

			thread.reported = true;
			await thread.save();

			res.send("reported");
		} catch (err) {
			res.json({ error: "Unable to report thread" });
		}
	});

	app.put("/api/replies/:board", async (req, res) => {
		try {
			const { thread_id, reply_id } = req.body;

			const thread = await Thread.findById(thread_id);

			if (!thread || thread.board !== req.params.board) {
				return res.json({ error: "Thread not found" });
			}

			const reply = thread.replies.id(reply_id);
			if (!reply) {
				return res.json({ error: "Reply not found" });
			}

			reply.reported = true;
			await thread.save();

			res.send("reported");
		} catch (err) {
			res.json({ error: "Unable to report reply" });
		}
	});
};
