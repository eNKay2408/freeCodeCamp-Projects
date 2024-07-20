const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

describe("Unit Tests", () => {
	const translator = new Translator();

	it("Translate Mangoes are my favorite fruit. to British English", () => {
		const input = "Mangoes are my favorite fruit.";
		const expectedWords = ["favourite"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate I ate yogurt for breakfast. to British English", () => {
		const input = "I ate yogurt for breakfast.";
		const expectedWords = ["yoghurt"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate We had a party at my friend's condo. to British English", () => {
		const input = "We had a party at my friend's condo.";
		const expectedWords = ["flat"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate Can you toss this in the trashcan for me? to British English", () => {
		const input = "Can you toss this in the trashcan for me?";
		const expectedWords = ["bin"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate The parking lot was full. to British English", () => {
		const input = "The parking lot was full.";
		const expectedWords = ["car park"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate Like a high tech Rube Goldberg machine. to British English", () => {
		const input = "Like a high tech Rube Goldberg machine.";
		const expectedWords = ["Heath Robinson device"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate To play hooky means to skip class or work. to British English", () => {
		const input = "To play hooky means to skip class or work.";
		const expectedWords = ["bunk off"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate No Mr. Bond, I expect you to die. to British English", () => {
		const input = "No Mr. Bond, I expect you to die.";
		const expectedWords = [">Mr<"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate Dr. Grosh will see you now. to British English", () => {
		const input = "Dr. Grosh will see you now.";
		const expectedWords = [">Dr<"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate Lunch is at 12:15 today. to British English", () => {
		const input = "Lunch is at 12:15 today.";
		const expectedWords = ["12.15"];
		const actual = translator.translateToBritish(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate We watched the footie match for a while. to American English", () => {
		const input = "We watched the footie match for a while";
		const expectedWords = ["soccer"];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate Paracetamol takes up to an hour to work. to American English", () => {
		const input = "Paracetamol takes up to an hour to work.";
		const expectedWords = ["Tylenol"];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate First, caramelise the onions. to American English", () => {
		const input = "First, caramelise the onions.";
		const expectedWords = ["caramelize"];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate I spent the bank holiday at the funfair. to American English", () => {
		const input = "I spent the bank holiday at the funfair.";
		const expectedWords = ["public holiday", "carnival"];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate I had a bicky then went to the chippy. to American English", () => {
		const input = "I had a bicky then went to the chippy.";
		const expectedWords = ["cookie", "fish-and-chip shop"];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate I've just got bits and bobs in my bum bag. to American English", () => {
		const input = "I've just got bits and bobs in my bum bag.";
		const expectedWords = ["odds and ends", "fanny pack"];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
		const input = "The car boot sale at Boxted Airfield was called off.";
		const expectedWords = ["swap meet"];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate Have you met Mrs Kalyani? to American English", () => {
		const input = "Have you met Mrs Kalyani?";
		const expectedWords = ["Mrs."];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate Prof Joyner of King's College, London. to American English", () => {
		const input = "Prof Joyner of King's College, London.";
		const expectedWords = ["Prof."];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Translate Tea time is usually around 4 or 4.30. to American English", () => {
		const input = "Tea time is usually around 4 or 4.30.";
		const expectedWords = ["4:30"];
		const actual = translator.translateToAmerican(input);
		expectedWords.forEach((word) => {
			assert.include(actual, word);
		});
	});

	it("Highlight translation in Mangoes are my favorite fruit.", () => {
		const input = "Mangoes are my favorite fruit.";
		const expected =
			'Mangoes are my <span class="highlight">favourite</span> fruit.';
		const actual = translator.translateToBritish(input);
		assert.equal(actual, expected);
	});

	it("Highlight translation in I ate yogurt for breakfast.", () => {
		const input = "I ate yogurt for breakfast.";
		const expected =
			'I ate <span class="highlight">yoghurt</span> for breakfast.';
		const actual = translator.translateToBritish(input);
		assert.equal(actual, expected);
	});

	it("Highlight translation in We watched the footie match for a while.", () => {
		const input = "We watched the footie match for a while.";
		const expected =
			'We watched the <span class="highlight">soccer</span> match for a while.';
		const actual = translator.translateToAmerican(input);
		assert.equal(actual, expected);
	});

	it("Highlight translation in Paracetamol takes up to an hour to work.", () => {
		const input = "Paracetamol takes up to an hour to work.";
		const expected =
			'<span class="highlight">Tylenol</span> takes up to an hour to work.';
		const actual = translator.translateToAmerican(input);
		assert.equal(actual, expected);
	});
});
