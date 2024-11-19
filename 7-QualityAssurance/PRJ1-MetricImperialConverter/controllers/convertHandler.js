function ConvertHandler() {
	this.getNum = function (input) {
		let result;
		let match = input.match(/[\.\d\/]+/g);

		if (!match) {
			return 1;
		}

		let numStr = match[0];
		if (numStr.includes("/")) {
			let nums = numStr.split("/");
			if (nums.length != 2) {
				return NaN;
			}

			result = parseFloat(nums[0]) / parseFloat(nums[1]);
		} else {
			result = parseFloat(numStr);
		}

		return result;
	};

	this.getUnit = function (input) {
		let result;
		let match = input.match(/[a-zA-Z]+/g);

		if (!match) {
			return null;
		}

		result = match[0].toLowerCase();
		const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

		if (!validUnits.includes(result)) {
			return null;
		}

		if (result === "l") {
			result = result.toUpperCase();
		}
		return result;
	};

	this.getReturnUnit = function (initUnit) {
		const unitMap = {
			gal: "L",
			l: "gal",
			mi: "km",
			km: "mi",
			lbs: "kg",
			kg: "lbs",
		};

		return unitMap[initUnit.toLowerCase()];
	};

	this.spellOutUnit = function (unit) {
		const unitMap = {
			gal: "gallons",
			l: "liters",
			mi: "miles",
			km: "kilometers",
			lbs: "pounds",
			kg: "kilograms",
		};

		return unitMap[unit.toLowerCase()];
	};

	this.convert = function (initNum, initUnit) {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;
		let result;

		switch (initUnit.toLowerCase()) {
			case "gal":
				result = initNum * galToL;
				break;
			case "l":
				result = initNum / galToL;
				break;
			case "lbs":
				result = initNum * lbsToKg;
				break;
			case "kg":
				result = initNum / lbsToKg;
				break;
			case "mi":
				result = initNum * miToKm;
				break;
			case "km":
				result = initNum / miToKm;
				break;
			default:
				result = NaN;
		}

		if (!isNaN(result)) {
			result = parseFloat(result.toFixed(5));
		}

		return result;
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		let result = `${initNum} ${this.spellOutUnit(
			initUnit
		)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
		return result;
	};
}

module.exports = ConvertHandler;
