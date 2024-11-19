/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const Book = require("../models/Book");

module.exports = (app) => {
	app
		.route("/api/books")
		.get(async (req, res) => {
			const books = await Book.find({});

			res.json(books);
		})

		.post(async (req, res) => {
			let title = req.body.title;
			if (!title) {
				return res.send("missing required field title");
			}

			const newBook = new Book({
				title,
			});
			await newBook.save();

			res.json(newBook);
		})

		.delete(async (req, res) => {
			await Book.deleteMany({});

			res.send("complete delete successful");
		});

	app
		.route("/api/books/:id")
		.get(async (req, res) => {
			let bookid = req.params.id;

			try {
				const book = await Book.findById(bookid);
				if (!book) {
					return res.send("no book exists");
				}

				res.json(book);
			} catch (err) {
				res.send("invalid book id");
			}
		})

		.post(async (req, res) => {
			let bookid = req.params.id;
			let comment = req.body.comment;

			if (!comment) {
				return res.send("missing required field comment");
			}

			try {
				const book = await Book.findById(bookid);
				if (!book) {
					return res.send("no book exists");
				}

				book.comments.push(comment);
				book.commentcount++;

				await book.save();
				res.json(book);
			} catch (err) {
				res.send("invalid book id");
			}
		})

		.delete(async (req, res) => {
			let bookid = req.params.id;

			try {
				const book = await Book.findByIdAndDelete(bookid);
				if (!book) {
					return res.send("no book exists");
				}

				res.send("delete successful");
			} catch (err) {
				res.send("invalid book id");
			}
		});
};
