const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

describe("Functional Tests", function () {
	it("Convert a valid input such as 10L", () => {
		chai
			.request(server)
			.get("/api/convert")
			.query({ input: "10L" })
			.end((err, res) => {
				assert.equal(res.type, "application/json");
				assert.equal(res.body.initNum, 10);
				assert.equal(res.body.initUnit, "L");
				assert.equal(res.body.returnNum, 2.64172);
				assert.equal(res.body.returnUnit, "gal");
			});
	});

	it("Convert an invalid input such as 32g", () => {
		chai
			.request(server)
			.get("/api/convert")
			.query({ input: "32g" })
			.end((err, res) => {
				assert.equal(res.text, "invalid unit");
			});
	});

	it("Convert an invalid number such as 3/7.2/4kg", () => {
		chai
			.request(server)
			.get("/api/convert")
			.query({ input: "3/7.2/4kg" })
			.end((err, res) => {
				assert.equal(res.text, "invalid number");
			});
	});

	it("Convert an invalid number AND unit such as 3/7.2/4kilomegagram", () => {
		chai
			.request(server)
			.get("/api/convert")
			.query({ input: "3/7.2/4kilomegagram" })
			.end((err, res) => {
				assert.equal(res.text, "invalid number and unit");
			});
	});

	it("Convert with no number such as kg", () => {
		chai
			.request(server)
			.get("/api/convert")
			.query({ input: "kg" })
			.end((err, res) => {
				assert.equal(res.type, "application/json");
				assert.equal(res.body.initNum, 1);
				assert.equal(res.body.initUnit, "kg");
				assert.equal(res.body.returnNum, 2.20462);
				assert.equal(res.body.returnUnit, "lbs");
			});
	});
});
