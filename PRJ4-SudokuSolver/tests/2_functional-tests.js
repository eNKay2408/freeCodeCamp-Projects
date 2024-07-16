const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

const puzzlesAndSolutions = require("../controllers/puzzle-strings.js");

describe("Functional Tests", () => {
	describe("POST /api/solve", () => {
		it("Solve a puzzle with valid puzzle string", (done) => {
			chai
				.request(server)
				.post("/api/solve")
				.send({ puzzle: puzzlesAndSolutions[0][0] })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.solution, puzzlesAndSolutions[0][1]);
					done();
				});
		});

		it("Solve a puzzle with missing puzzle string", (done) => {
			chai
				.request(server)
				.post("/api/solve")
				.send({})
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.error, "Required field missing");
					done();
				});
		});

		it("Solve a puzzle with invalid characters", (done) => {
			chai
				.request(server)
				.post("/api/solve")
				.send({ puzzle: puzzlesAndSolutions[0][0].replace("1", "X") })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.error, "Invalid characters in puzzle");
					done();
				});
		});

		it("Solve a puzzle with incorrect length", (done) => {
			chai
				.request(server)
				.post("/api/solve")
				.send({ puzzle: puzzlesAndSolutions[0][0].slice(0, -1) })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(
						res.body.error,
						"Expected puzzle to be 81 characters long"
					);
					done();
				});
		});

		it("Solve a puzzle that cannot be solved", (done) => {
			chai
				.request(server)
				.post("/api/solve")
				.send({ puzzle: puzzlesAndSolutions[0][0].replace("1", "3") })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.error, "Puzzle cannot be solved");
					done();
				});
		});
	});

	describe("POST /api/check", () => {
		it("Check a puzzle placement with all fields", (done) => {
			chai
				.request(server)
				.post("/api/check")
				.send({
					puzzle: puzzlesAndSolutions[0][0],
					coordinate: "A2",
					value: "3",
				})
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.isTrue(res.body.valid);
					done();
				});
		});

		it("Check a puzzle placement with single placement conflict", (done) => {
			chai
				.request(server)
				.post("/api/check")
				.send({
					puzzle: puzzlesAndSolutions[0][0],
					coordinate: "A2",
					value: "4",
				})
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.isFalse(res.body.valid);
					assert.deepEqual(res.body.conflict, ["row"]);
					done();
				});
		});

		it("Check a puzzle placement with multiple placement conflicts", (done) => {
			chai
				.request(server)
				.post("/api/check")
				.send({
					puzzle: puzzlesAndSolutions[0][0],
					coordinate: "A2",
					value: "6",
				})
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.isFalse(res.body.valid);
					assert.deepEqual(res.body.conflict, ["column", "region"]);
					done();
				});
		});

		it("Check a puzzle placement with all placement conflicts", (done) => {
			chai
				.request(server)
				.post("/api/check")
				.send({
					puzzle: puzzlesAndSolutions[0][0],
					coordinate: "A2",
					value: "2",
				})
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.isFalse(res.body.valid);
					assert.deepEqual(res.body.conflict, ["row", "column", "region"]);
					done();
				});
		});

		it("Check a puzzle placement with missing required fields", (done) => {
			chai
				.request(server)
				.post("/api/check")
				.send({ puzzle: puzzlesAndSolutions[0][0], value: "2" })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.error, "Required field(s) missing");
					done();
				});
		});

		it("Check a puzzle placement with invalid characters", (done) => {
			chai
				.request(server)
				.post("/api/check")
				.send({
					puzzle: puzzlesAndSolutions[0][0].replace("1", "X"),
					coordinate: "A2",
					value: "2",
				})
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.error, "Invalid characters in puzzle");
					done();
				});
		});

		it("Check a puzzle placement with incorrect length", (done) => {
			chai
				.request(server)
				.post("/api/check")
				.send({
					puzzle: puzzlesAndSolutions[0][0] + "2408",
					coordinate: "A2",
					value: "2",
				})
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(
						res.body.error,
						"Expected puzzle to be 81 characters long"
					);
					done();
				});
		});

		it("Check a puzzle placement with invalid placement coordinate", (done) => {
			chai
				.request(server)
				.post("/api/check")
				.send({
					puzzle: puzzlesAndSolutions[0][0],
					coordinate: "A22",
					value: "2",
				})
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.error, "Invalid coordinate");
					done();
				});
		});

		it("Check a puzzle placement with invalid placement value", (done) => {
			chai
				.request(server)
				.post("/api/check")
				.send({
					puzzle: puzzlesAndSolutions[0][0],
					coordinate: "A2",
					value: "2408",
				})
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.error, "Invalid value");
					done();
				});
		});
	});
});
