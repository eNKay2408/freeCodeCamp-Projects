const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

describe("Functional Tests", function () {
	describe("GET request to /api/stock-prices", () => {
		it("Viewing one stock", (done) => {
			chai
				.request(server)
				.get("/api/stock-prices")
				.query({ stock: "GOOG" })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.stockData.stock, "GOOG");
					assert.isNumber(res.body.stockData.likes);
					assert.isNumber(res.body.stockData.price);
					done();
				});
		});

		it("Viewing one stock and liking it", (done) => {
			chai
				.request(server)
				.get("/api/stock-prices")
				.query({ stock: "GOOG", like: true })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.stockData.stock, "GOOG");
					assert.isAtLeast(res.body.stockData.likes, 1);
					done();
				});
		});

		it("Viewing the same stock and liking it again", (done) => {
			chai
				.request(server)
				.get("/api/stock-prices")
				.query({ stock: "MSFT", like: true })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.stockData.stock, "MSFT");
					assert.isAtLeast(res.body.stockData.likes, 1);
					chai
						.request(server)
						.get("/api/stock-prices")
						.query({ stock: "MSFT", like: true })
						.end((err, res2) => {
							assert.equal(res2.status, 200);
							assert.equal(res2.body.stockData.stock, "MSFT");
							assert.equal(res2.body.stockData.likes, res.body.stockData.likes);
							done();
						});
				});
		});

		it("Viewing two stocks", (done) => {
			chai
				.request(server)
				.get("/api/stock-prices")
				.query({ stock: ["GOOG", "MSFT"] })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.isArray(res.body.stockData);
					assert.equal(res.body.stockData[0].stock, "GOOG");
					assert.equal(res.body.stockData[1].stock, "MSFT");
					assert.isNumber(res.body.stockData[0].price);
					assert.isNumber(res.body.stockData[1].price);
					assert.isNumber(res.body.stockData[0].rel_likes);
					assert.isNumber(res.body.stockData[1].rel_likes);
					assert.notProperty(res.body.stockData[0], "likes");
					assert.notProperty(res.body.stockData[1], "likes");
					done();
				});
		});

		it("Viewing two stocks and liking them", (done) => {
			chai
				.request(server)
				.get("/api/stock-prices")
				.query({ stock: ["GOOG", "MSFT"], like: true })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.isArray(res.body.stockData);
					assert.equal(res.body.stockData[0].stock, "GOOG");
					assert.equal(res.body.stockData[1].stock, "MSFT");
					assert.equal(
						res.body.stockData[0].rel_likes,
						-res.body.stockData[1].rel_likes
					);
					done();
				});
		});
	});
});
