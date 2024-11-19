const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
const Issue = require("../models/Issue");

chai.use(chaiHttp);

describe("Functional Tests", function () {
	describe("POST /api/issues/{project}", () => {
		it("Create an issue with every field", (done) => {
			chai
				.request(server)
				.post("/api/issues/test")
				.send({
					issue_title: "Title",
					issue_text: "text",
					created_by: "Functional Test - Every field",
					assigned_to: "Chai and Mocha",
					status_text: "In QA",
				})
				.end((err, res) => {
					assert.equal(res.body.issue_title, "Title");
					assert.equal(res.body.issue_text, "text");
					assert.equal(res.body.created_by, "Functional Test - Every field");
					assert.equal(res.body.assigned_to, "Chai and Mocha");
					assert.equal(res.body.status_text, "In QA");
					assert.isTrue(res.body.open);
					done();
				});
		});

		it("Create an issue with only required fields", (done) => {
			chai
				.request(server)
				.post("/api/issues/test")
				.send({
					issue_title: "Title",
					issue_text: "text",
					created_by: "Functional Test - Only required fields",
				})
				.end((err, res) => {
					assert.equal(res.body.issue_title, "Title");
					assert.equal(res.body.issue_text, "text");
					assert.equal(
						res.body.created_by,
						"Functional Test - Only required fields"
					);
					assert.equal(res.body.assigned_to, "");
					assert.isTrue(res.body.open);
					done();
				});
		});

		it("Create an issue with missing required fields", (done) => {
			chai
				.request(server)
				.post("/api/issues/test")
				.send({
					issue_title: "Title",
				})
				.end((err, res) => {
					assert.equal(res.body.error, "required field(s) missing");
					done();
				});
		});
	});

	describe("GET /api/issues/{project}", () => {
		it("View issues on a project", (done) => {
			chai
				.request(server)
				.get("/api/issues/test")
				.end((err, res) => {
					assert.isArray(res.body);
					res.body.forEach((issue) => {
						assert.property(issue, "issue_title");
						assert.property(issue, "issue_text");
						assert.property(issue, "created_by");
						assert.property(issue, "assigned_to");
						assert.property(issue, "status_text");
						assert.property(issue, "open");
						assert.property(issue, "created_on");
						assert.property(issue, "updated_on");
						assert.property(issue, "_id");
					});
					done();
				});
		});

		it("View issues on a project with one filter", (done) => {
			chai
				.request(server)
				.get("/api/issues/test?open=true")
				.end((err, res) => {
					assert.isArray(res.body);
					res.body.forEach((issue) => {
						assert.isTrue(issue.open);
					});
					done();
				});
		});

		it("View issues on a project with multiple filters", (done) => {
			chai
				.request(server)
				.get("/api/issues/test?open=true&issue_title=Title")
				.end((err, res) => {
					assert.isArray(res.body);
					res.body.forEach((issue) => {
						assert.isTrue(issue.open);
						assert.equal(issue.issue_title, "Title");
					});
					done();
				});
		});
	});

	describe("PUT /api/issues/{project}", () => {
		it("Update one field on an issue", (done) => {
			chai
				.request(server)
				.put("/api/issues/test")
				.send({
					_id: "666e6c146422786adfc73c6e",
					issue_title: "Updated Title",
				})
				.end((err, res) => {
					assert.equal(res.body.result, "successfully updated");
					assert.equal(res.body._id, "666e6c146422786adfc73c6e");
					Issue.findById("666e6c146422786adfc73c6e").then((issue) => {
						assert.equal(issue.issue_title, "Updated Title");
					});
					done();
				});
		});

		it("Update multiple fields on an issue", (done) => {
			chai
				.request(server)
				.put("/api/issues/test")
				.send({
					_id: "666dfd8817f55186ce410f0d",
					issue_title: "Updated Title",
					issue_text: "Updated text",
				})
				.end((err, res) => {
					assert.equal(res.body.result, "successfully updated");
					assert.equal(res.body._id, "666dfd8817f55186ce410f0d");
					Issue.findById("666dfd8817f55186ce410f0d").then((issue) => {
						assert.equal(issue.issue_title, "Updated Title");
						assert.equal(issue.issue_text, "Updated text");
					});
					done();
				});
		});

		it("Update an issue with missing _id", (done) => {
			chai
				.request(server)
				.put("/api/issues/test")
				.send({
					issue_title: "Updated Title",
				})
				.end((err, res) => {
					assert.equal(res.body.error, "missing _id");
					done();
				});
		});

		it("Update an issue with no fields to update", (done) => {
			chai
				.request(server)
				.put("/api/issues/test")
				.send({
					_id: "666e67cb286e7ec3660cbed6",
				})
				.end((err, res) => {
					assert.equal(res.body.error, "no update field(s) sent");
					assert.equal(res.body._id, "666e67cb286e7ec3660cbed6");
					done();
				});
		});

		it("Update an issue with an invalid _id", (done) => {
			chai
				.request(server)
				.put("/api/issues/test")
				.send({
					_id: "invalidId",
					issue_title: "Updated Title",
				})
				.end((err, res) => {
					assert.equal(res.body.error, "could not update");
					assert.equal(res.body._id, "invalidId");
					done();
				});
		});
	});

	describe("DELETE /api/issues/{project}", () => {
		it("Delete an issue", (done) => {
			chai
				.request(server)
				.delete("/api/issues/test")
				.send({ _id: "666dfd8817f55186ce410f0b" })
				.end((err, res) => {
					if (res.body.result) {
						assert.equal(res.body.result, "successfully deleted");
						assert.equal(res.body._id, "666dfd8817f55186ce410f0b");
						Issue.findById("666dfd8817f55186ce410f0b").then((issue) => {
							assert.isNull(issue);
						});
						done();
					} else {
						assert.equal(res.body.error, "could not delete");
						assert.equal(res.body._id, "666dfd8817f55186ce410f0b");
						done();
					}
				});
		});

		it("Delete an issue with an invalid _id", (done) => {
			chai
				.request(server)
				.delete("/api/issues/test")
				.send({ _id: "invalidId" })
				.end((err, res) => {
					assert.equal(res.body.error, "could not delete");
					assert.equal(res.body._id, "invalidId");
					done();
				});
		});

		it("Delete an issue with missing _id", (done) => {
			chai
				.request(server)
				.delete("/api/issues/test")
				.send({})
				.end((err, res) => {
					assert.equal(res.body.error, "missing _id");
					done();
				});
		});
	});
});
