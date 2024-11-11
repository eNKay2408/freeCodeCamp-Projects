const input = document.getElementById("number");
const convert = document.getElementById("convert-btn");
const output = document.getElementById("output");

const decimalToRomanNumeral = (number) => {
	const lookup = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1,
	};

	let roman = "";

	for (let i in lookup) {
		while (number >= lookup[i]) {
			roman += i;
			number -= lookup[i];
		}
	}

	return roman;
};

const checkUserInput = () => {
	output.classList.remove("hidden");

	const inputInt = parseInt(input.value);

	if (!input.value || isNaN(inputInt) || input.value.includes("e")) {
		output.textContent = "Please enter a valid number";
		output.classList.add("error");
	} else if (inputInt < 1) {
		output.textContent = "Please enter a number greater than or equal to 1";
		output.classList.add("error");
	} else if (inputInt > 3999) {
		output.textContent = "Please enter a number less than or equal to 3999";
		output.classList.add("error");
	} else {
		output.textContent = decimalToRomanNumeral(inputInt);
		output.classList.remove("error");
	}

	input.value = "";
};

convert.addEventListener("click", checkUserInput);
input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		checkUserInput();
	}
});
