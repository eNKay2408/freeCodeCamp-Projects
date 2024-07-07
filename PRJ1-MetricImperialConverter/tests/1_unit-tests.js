const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

describe("Unit Tests", function () {
	it("convertHandler should correctly read a whole number input", () => {
		assert.strictEqual(convertHandler.getNum("24km"), 24);
	});

	it("convertHandler should correctly read a decimal number input", () => {
		assert.strictEqual(convertHandler.getNum("24.08km"), 24.08);
	});

	it("convertHandler should correctly read a fractional input", () => {
		assert.strictEqual(convertHandler.getNum("24/08km"), 3);
	});

	it("convertHandler should correctly read a fractional input with a decimal", () => {
		assert.strictEqual(convertHandler.getNum("24.08/4km"), 6.02);
	});

	it("convertHandler should correctly return an error on a double-fraction", () => {
		assert.isNaN(convertHandler.getNum("24/08/2004km"));
	});

	it("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", () => {
		assert.strictEqual(convertHandler.getNum("km"), 1);
	});

	it("convertHandler should correctly read each valid input unit", () => {
		const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
		validUnits.forEach((unit) => {
			assert.strictEqual(convertHandler.getUnit(`24${unit}`), unit);
		});
	});

	it("convertHandler should correctly return an error for an invalid input unit", () => {
		assert.isNull(convertHandler.getUnit("24k"));
	});

	it("convertHandler should return the correct return unit for each valid input unit", () => {
		const inputOutputPairs = [
			["gal", "L"],
			["L", "gal"],
			["mi", "km"],
			["km", "mi"],
			["lbs", "kg"],
			["kg", "lbs"],
		];

		inputOutputPairs.forEach((pair) => {
			assert.strictEqual(convertHandler.getReturnUnit(pair[0]), pair[1]);
		});
	});

	it("convertHandler should correctly return the spelled-out string unit for each valid input unit", () => {
		const unitSpellingPairs = [
			["gal", "gallons"],
			["L", "liters"],
			["mi", "miles"],
			["km", "kilometers"],
			["lbs", "pounds"],
			["kg", "kilograms"],
		];

		unitSpellingPairs.forEach((pair) => {
			assert.strictEqual(convertHandler.spellOutUnit(pair[0]), pair[1]);
		});
	});

	it("convertHandler should correctly convert gal to L", () => {
		assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541);
	});

	it("convertHandler should correctly convert L to gal", () => {
		assert.strictEqual(convertHandler.convert(1, "L"), 0.26417);
	});

	it("convertHandler should correctly convert mi to km", () => {
		assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934);
	});

	it("convertHandler should correctly convert km to mi", () => {
		assert.strictEqual(convertHandler.convert(1, "km"), 0.62137);
	});

	it("convertHandler should correctly convert lbs to kg", () => {
		assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359);
	});

	it("convertHandler should correctly convert kg to lbs", () => {
		assert.strictEqual(convertHandler.convert(1, "kg"), 2.20462);
	});
});
