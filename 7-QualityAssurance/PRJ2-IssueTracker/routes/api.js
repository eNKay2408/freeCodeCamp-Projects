"use strict";

const bodyParser = require("body-parser");
const Issue = require("../models/Issue");
const mongoose = require("mongoose");

require("dotenv").config();

module.exports = function (app) {
	app
		.route("/api/issues/:project")

		.get(async (req, res) => {
			let project = req.params.project;

			const query = { ...req.query, project: project };
			const issues = await Issue.find(query);

			res.json(issues);
		})

		.post(async (req, res) => {
			let project = req.params.project;
			const { issue_title, issue_text, created_by, assigned_to, status_text } =
				req.body;

			if (!issue_title || !issue_text || !created_by) {
				return res.send({ error: "required field(s) missing" });
			}

			const newIssue = new Issue({
				issue_title,
				issue_text,
				created_by,
				assigned_to,
				status_text,
				project,
			});
			const issue = await newIssue.save();

			res.json(issue);
		})

		.put(async (req, res) => {
			let project = req.params.project;
			let issueId = req.body._id;
			if (!issueId) {
				return res.json({ error: "missing _id" });
			}

			if (Object.keys(req.body).length === 1) {
				return res.json({ error: "no update field(s) sent", _id: issueId });
			}

			const updates = {
				...req.body,
				updated_on: Date.now(),
			};

			if (!mongoose.Types.ObjectId.isValid(issueId)) {
				return res.json({ error: "could not update", _id: issueId });
			}

			const issue = await Issue.findByIdAndUpdate(issueId, updates, {
				new: true,
			});
			if (!issue) {
				return res.json({ error: "could not update", _id: issueId });
			}

			res.json({ result: "successfully updated", _id: issueId });
		})

		.delete(async (req, res) => {
			let project = req.params.project;
			let issueId = req.body._id;
			if (!issueId) {
				return res.json({ error: "missing _id" });
			}

			if (!mongoose.Types.ObjectId.isValid(issueId)) {
				return res.json({ error: "could not delete", _id: issueId });
			}

			const issue = await Issue.findByIdAndDelete(issueId);
			if (!issue) {
				return res.json({ error: "could not delete", _id: issueId });
			}

			res.json({ result: "successfully deleted", _id: issueId });
		});
};
