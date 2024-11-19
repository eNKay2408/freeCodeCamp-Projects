const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
	highlight(text) {
		return `<span class="highlight">${text}</span>`;
	}

	capitalizeFirstLetter(text) {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	translateToBritish(text) {
		let translatedText = text;

		for (const [american, british] of Object.entries(americanOnly)) {
			const regex = new RegExp(`\\b${american}\\b`, "gi");
			translatedText = translatedText.replace(regex, (match) =>
				this.highlight(british)
			);
		}

		for (const [american, british] of Object.entries(
			americanToBritishSpelling
		)) {
			const regex = new RegExp(`\\b${american}\\b`, "gi");
			translatedText = translatedText.replace(regex, (match) =>
				this.highlight(british)
			);
		}

		for (const [american, british] of Object.entries(americanToBritishTitles)) {
			const regex = new RegExp(`\\b${british}\\.(?=\\W|$)`, "gi");
			translatedText = translatedText.replace(regex, (match) =>
				this.highlight(this.capitalizeFirstLetter(british))
			);
		}

		const timeRegex = /\b\d{1,2}:\d{2}\b/g;
		translatedText = translatedText.replace(timeRegex, (match) =>
			this.highlight(match.replace(":", "."))
		);

		return translatedText;
	}

	translateToAmerican(text) {
		let translatedText = text;

		for (const [british, american] of Object.entries(britishOnly)) {
			const regex = new RegExp(`\\b${british}\\b`, "gi");
			translatedText = translatedText.replace(regex, (match) =>
				this.highlight(american)
			);
		}

		for (const [american, british] of Object.entries(
			americanToBritishSpelling
		)) {
			const regex = new RegExp(`\\b${british}\\b`, "gi");
			translatedText = translatedText.replace(regex, (match) =>
				this.highlight(american)
			);
		}

		for (const [american, british] of Object.entries(americanToBritishTitles)) {
			const regex = new RegExp(`\\b${british}\\b`, "gi");
			translatedText = translatedText.replace(regex, (match) =>
				this.highlight(this.capitalizeFirstLetter(american))
			);
		}

		const timeRegex = /\b\d{1,2}\.\d{2}\b/g;
		translatedText = translatedText.replace(timeRegex, (match) =>
			this.highlight(match.replace(".", ":"))
		);

		return translatedText;
	}
}

module.exports = Translator;
