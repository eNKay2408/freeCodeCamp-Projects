const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

const Thread = require("../models/thread");
const thread = require("../models/thread");

chai.use(chaiHttp);

describe("Functional Tests", function () {
	let testThreadId;
	let testReplyId;
	const testBoard = "testBoard";
	const testThread = "testThread";
	const testReply = "testReply";
	const deletePassword = "testPassword";
	const incorrectPassword = "incorrectPassword";

	it("Creating a new thread: POST request to /api/threads/{board}", (done) => {
		chai
			.request(server)
			.post(`/api/threads/${testBoard}`)
			.send({ text: testThread, delete_password: deletePassword })
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.property(res.body, "_id");
				assert.equal(res.body.board, testBoard);
				assert.equal(res.body.text, testThread);
				assert.instanceOf(new Date(res.body.created_on), Date);
				assert.instanceOf(new Date(res.body.bumped_on), Date);
				assert.isFalse(res.body.reported);
				assert.isEmpty(res.body.replies);
				assert.equal(res.body.replycount, 0);

				Thread.findById(res.body._id).then((thread) => {
					assert.isObject(thread);
					assert.property(thread, "delete_password");
				});
				testThreadId = res.body._id;
				done();
			});
	});

	it("Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}", (done) => {
		chai
			.request(server)
			.get(`/api/threads/${testBoard}`)
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.isArray(res.body);
				assert.isAtMost(res.body.length, 10);
				res.body.forEach((thread) => {
					assert.isAtMost(thread.replies.length, 3);
				});
				done();
			});
	});

	it("Reporting a thread: PUT request to /api/threads/{board}", (done) => {
		chai
			.request(server)
			.put(`/api/threads/${testBoard}`)
			.send({ thread_id: testThreadId })
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, "reported");

				Thread.findById(testThreadId).then((thread) => {
					assert.isTrue(thread.reported);
					done();
				});
			});
	});

	it("Creating a new reply: POST request to /api/replies/{board}", (done) => {
		chai
			.request(server)
			.post(`/api/replies/${testBoard}`)
			.send({
				thread_id: testThreadId,
				text: testReply,
				delete_password: deletePassword,
			})
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.isAtLeast(res.body.replycount, 1);

				Thread.findById(testThreadId).then((thread) => {
					assert.equal(thread.replies.length, 1);
					assert.equal(thread.replies[0].text, testReply);
					assert.isFalse(thread.replies[0].reported);
					assert.instanceOf(new Date(thread.replies[0].created_on), Date);
					assert.property(thread.replies[0], "_id");
					assert.property(thread.replies[0], "delete_password");
					testReplyId = thread.replies[0]._id;
					done();
				});
			});
	});

	it("Viewing a single thread with all replies: GET request to /api/replies/{board}", (done) => {
		chai
			.request(server)
			.get(`/api/replies/${testBoard}?thread_id=${testThreadId}`)
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.body._id, testThreadId);
				assert.equal(res.body.board, testBoard);
				assert.isAtLeast(res.body.replies.length, 1);
				assert.equal(res.body.replies[0].text, testReply);
				done();
			});
	});

	it("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password", (done) => {
		chai
			.request(server)
			.delete(`/api/replies/${testBoard}`)
			.send({
				thread_id: testThreadId,
				reply_id: testReplyId,
				delete_password: incorrectPassword,
			})
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, "incorrect password");
				done();
			});
	});

	it("Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password", (done) => {
		chai
			.request(server)
			.delete(`/api/replies/${testBoard}`)
			.send({
				thread_id: testThreadId,
				reply_id: testReplyId,
				delete_password: deletePassword,
			})
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, "success");
				Thread.findById(testThreadId).then((thread) => {
					thread.replies.forEach((reply) => {
						if (reply._id === testReplyId) {
							assert.equal(reply.text, "[deleted]");
						}
					});
					done();
				});
			});
	});

	it("Reporting a reply: PUT request to /api/replies/{board}", (done) => {
		chai
			.request(server)
			.put(`/api/replies/${testBoard}`)
			.send({ thread_id: testThreadId, reply_id: testReplyId })
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, "reported");
				Thread.findById(testThreadId).then((thread) => {
					thread.replies.forEach((reply) => {
						if (reply._id === testReplyId) {
							assert.isTrue(reply.reported);
						}
					});
					done();
				});
			});
	});

	it("Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password", (done) => {
		chai
			.request(server)
			.delete(`/api/threads/${testBoard}`)
			.send({ thread_id: testThreadId, delete_password: incorrectPassword })
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, "incorrect password");
				done();
			});
	});

	it("Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password", (done) => {
		chai
			.request(server)
			.delete(`/api/threads/${testBoard}`)
			.send({ thread_id: testThreadId, delete_password: deletePassword })
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, "success");

				Thread.findById(testThreadId).then((thread) => {
					assert.isNull(thread);
					done();
				});
			});
	});
});
