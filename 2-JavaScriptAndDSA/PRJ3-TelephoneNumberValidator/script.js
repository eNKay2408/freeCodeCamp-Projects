const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const phoneNumberRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

const validList = [phoneNumberRegex];

const isValidUSNumber = (number) =>
	validList.some((regex) => regex.test(number));

const processValidNumber = () => {
	if (userInput.value === "") {
		alert("Please provide a phone number");
		return;
	}

	const result = document.createElement("div");
	result.className = "result";

	if (isValidUSNumber(userInput.value)) {
		result.textContent = "Valid US number: " + userInput.value;
		result.classList.add("true");
	} else {
		result.textContent = "Invalid US number: " + userInput.value;
		result.classList.add("false");
	}

	resultsDiv.appendChild(result);

	userInput.value = "";
};

checkBtn.addEventListener("click", processValidNumber);
userInput.addEventListener("keydown", (event) => {
	console.log(event.key);
	if (event.key === "Enter") {
		processValidNumber();
	}
});

clearBtn.addEventListener("click", () => {
	resultsDiv.innerHTML = "";
});
