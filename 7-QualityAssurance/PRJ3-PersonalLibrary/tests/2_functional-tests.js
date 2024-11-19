/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

describe("Functional Tests", function () {
	/*
	 * ----[EXAMPLE TEST]----
	 * Each test should completely test the response of the API end-point including response status code!
	 */
	it("#example Test GET /api/books", function (done) {
		chai
			.request(server)
			.get("/api/books")
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isArray(res.body, "response should be an array");
				assert.property(
					res.body[0],
					"commentcount",
					"Books in array should contain commentcount"
				);
				assert.property(
					res.body[0],
					"title",
					"Books in array should contain title"
				);
				assert.property(
					res.body[0],
					"_id",
					"Books in array should contain _id"
				);
				done();
			});
	});
	/*
	 * ----[END of EXAMPLE TEST]----
	 */

	describe("Routing tests", function () {
		describe("POST /api/books with title => create book object/expect book object", function () {
			it("Test POST /api/books with title", function (done) {
				chai
					.request(server)
					.post("/api/books")
					.send({ title: "Test Book" })
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.property(res.body, "_id");
						assert.equal(res.body.title, "Test Book");
						assert.equal(res.body.commentcount, 0);
						assert.isEmpty(res.body.comments);
						done();
					});
			});

			it("Test POST /api/books with no title given", function (done) {
				chai
					.request(server)
					.post("/api/books")
					.send({})
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.text, "missing required field title");
						done();
					});
			});
		});

		describe("GET /api/books => array of books", function () {
			it("Test GET /api/books", function (done) {
				chai
					.request(server)
					.get("/api/books")
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.isArray(res.body, "response should be an array");
						res.body.forEach((book) => {
							assert.property(book, "_id");
							assert.property(book, "title");
							assert.isArray(book.comments);
							assert.isNumber(book.commentcount);
						});
						done();
					});
			});
		});

		describe("GET /api/books/[id] => book object with [id]", function () {
			it("Test GET /api/books/[id] with id not in db", function (done) {
				chai
					.request(server)
					.get("/api/books/666fdfc8e484524b665eafa8")
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.text, "no book exists");
						done();
					});
			});

			it("Test GET /api/books/[id] with valid id in db", function (done) {
				chai
					.request(server)
					.get("/api/books/666feff768c8c5922f171ee8")
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.body.title, "Test Book");
						assert.equal(res.body.comments[0], "Test Comment");
						assert.isNumber(res.body.commentcount);
						done();
					});
			});
		});

		describe("POST /api/books/[id] => add comment/expect book object with id", function () {
			it("Test POST /api/books/[id] with comment", function (done) {
				chai
					.request(server)
					.post("/api/books/666feff768c8c5922f171ee8")
					.send({ comment: "Test Comment" })
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.body.title, "Test Book");
						assert.isNumber(res.body.commentcount);
						assert.equal(
							res.body.comments[res.body.commentcount - 1],
							"Test Comment"
						);
						done();
					});
			});

			it("Test POST /api/books/[id] without comment field", function (done) {
				chai
					.request(server)
					.post("/api/books/666feff768c8c5922f171ee8")
					.send({})
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.text, "missing required field comment");
						done();
					});
			});

			it("Test POST /api/books/[id] with comment, id not in db", function (done) {
				chai
					.request(server)
					.post("/api/books/666fe3bfcffff647d9bd7f00")
					.send({ comment: "Test Comment" })
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.text, "no book exists");
						done();
					});
			});
		});

		describe("DELETE /api/books/[id] => delete book object id", function () {
			it("Test DELETE /api/books/[id] with valid id in db", function (done) {
				chai
					.request(server)
					.delete("/api/books/666feddb02d546bcc7c6a77c")
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.text, "delete successful");
						done();
					});
			});

			it("Test DELETE /api/books/[id] with  id not in db", function (done) {
				chai
					.request(server)
					.delete("/api/books/666fe3d1743f3379e5a45260")
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.text, "no book exists");
						done();
					});
			});
		});
	});
});
