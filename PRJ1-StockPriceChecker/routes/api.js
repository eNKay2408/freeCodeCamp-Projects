"use strict";

const axios = require("axios");
const crypto = require("crypto");
const Stock = require("../models/stock");

module.exports = (app) => {
	const hashIP = (ip) => {
		return crypto.createHash("sha256").update(ip).digest("hex");
	};

	const getStockData = async (stock, like, hashedIP) => {
		const API_URL =
			"https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock";

		const stockResponse = await axios.get(`${API_URL}/${stock}/quote`);
		const stockPrice = stockResponse.data.latestPrice;

		let stockDoc = await Stock.findOne({ stock });
		if (!stockDoc) {
			stockDoc = new Stock({ stock });
		}

		if (like === "true" && !stockDoc.ips.includes(hashedIP)) {
			stockDoc.likes += 1;
			stockDoc.ips.push(hashedIP);
		}

		await stockDoc.save();

		return {
			stock,
			price: stockPrice,
			likes: stockDoc.likes,
		};
	};

	app.route("/api/stock-prices").get(async (req, res) => {
		let { stock, like } = req.query;

		const ip = req.ip;
		const hashedIP = hashIP(ip);

		if (typeof stock === "string") {
			stock = stock.toUpperCase();
			const stockData = await getStockData(stock, like, hashedIP);

			res.json({ stockData });
		} else if (Array.isArray(stock)) {
			stock = stock.map((s) => s.toUpperCase());

			const stockData1 = await getStockData(stock[0], like, hashedIP);
			const stockData2 = await getStockData(stock[1], like, hashedIP);

			stockData1.rel_likes = stockData1.likes - stockData2.likes;
			stockData2.rel_likes = -stockData1.rel_likes;

			delete stockData1.likes;
			delete stockData2.likes;

			res.json({ stockData: [stockData1, stockData2] });
		} else {
			res.json({ error: "Invalid stock parameter" });
		}
	});
};
