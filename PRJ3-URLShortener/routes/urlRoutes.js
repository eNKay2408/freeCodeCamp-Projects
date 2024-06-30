const express = require("express");
const router = express.Router();
const dns = require("dns");
const bodyParser = require("body-parser");
const Url = require("../models/Url");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", async (req, res) => {
	const originalUrl = req.body.url;

	let urlObject;
	try {
		urlObject = new URL(originalUrl);
	} catch (err) {
		return res.json({ error: "Invalid Url" });
	}

	dns.lookup(urlObject.hostname, async (err) => {
		if (err) {
			return res.json({ error: "Invalid Url" });
		}

		try {
			const existedUrl = await Url.findOne({ originalUrl: originalUrl });
			if (existedUrl) {
				res.json({
					original_url: existedUrl.originalUrl,
					short_url: existedUrl.shortUrl,
				});
			} else {
				const newUrl = new Url({
					originalUrl: originalUrl,
				});
				await newUrl.save();
				res.json({
					original_url: newUrl.originalUrl,
					short_url: newUrl.shortUrl,
				});
			}
		} catch (err) {
			res.json({ error: "Server error" });
		}
	});
});

router.get("/:shortUrl?", async (req, res) => {
	const shortUrl = req.params.shortUrl;
	const existedUrl = await Url.findOne({ shortUrl: shortUrl });

	if (existedUrl) {
		res.redirect(existedUrl.originalUrl);
	} else {
		return res.json({ error: "No short URL found for the given input" });
	}
});

module.exports = router;
