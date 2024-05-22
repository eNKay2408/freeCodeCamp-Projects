import $ from "https://esm.sh/jquery";
import * as Math from "https://esm.sh/mathjs";
import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

$(document).ready(function () {
	$("#controls").children().addClass("btn");
	$(".number").addClass("btn-secondary");
	$(".operator").addClass("btn-warning");
	$("#decimal").addClass("btn-dark");
	$("#equals").addClass("btn-primary");
	$("#clear").addClass("btn-danger");
});

// Regex
const initialDisplay = "0";
const zeroRegex = /([+\-*/]0|[1-9]+0*|\.0*)$/;
const decimalRegex = /(^[\d]+\.$)|([+\-*/]\.|[+\-*/][\d]+\.)$/;
const operatorRegex = /([+\-*/][+\-*/])$/;
const subtractRegex = /([\d][+\-*/][\-])$/;

// React
const App = () => {
	const [display, setDisplay] = React.useState(initialDisplay);
	const [result, setResult] = React.useState("");

	const handleDisplay = (value) => {
		if (display === initialDisplay) {
			if (value === ".") value = "0.";
			setDisplay(value);
			return;
		}
		if (result !== "") {
			if (/[+\-*/]$/.test(value)) setDisplay(result + value);
			else setDisplay(value);
			setResult("");
			return;
		}

		if (value === "0" && !zeroRegex.test(display + value)) return;
		if (value === ".") {
			if (!decimalRegex.test(display + value)) return;
			if (/[+\-*/]$/.test(display)) value = "0.";
		}
		if (/[+\-*/]$/.test(value)) {
			if (value === "-" && subtractRegex.test(display + value)) {
			} else if (operatorRegex.test(display + value)) {
				if (/\d/.test(display[display.length - 2]))
					setDisplay((prevDisplay) => prevDisplay.slice(0, -1));
				else setDisplay((prevDisplay) => prevDisplay.slice(0, -2));
			}
		}

		setDisplay((prevDisplay) => prevDisplay + value);
	};

	const handleClear = () => {
		setDisplay(initialDisplay);
		setResult("");
	};

	const handleEquals = () => {
		const result = Math.evaluate(display);
		const roundedResult = parseFloat(result.toFixed(6));
		setDisplay(roundedResult);
		setResult(roundedResult);
	};

	const handleClick = (value) => {
		if (value === "clear") return () => handleClear();
		else if (value === "equals") return () => handleEquals();
		else return () => handleDisplay(value);
	};

	return /*#__PURE__*/ React.createElement(
		"div",
		{ id: "calculator" } /*#__PURE__*/,
		React.createElement("div", { id: "display" }, display) /*#__PURE__*/,

		React.createElement(
			"div",
			{ id: "controls" } /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "seven", class: "number", onClick: handleClick("7") },
				"7"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "eight", class: "number", onClick: handleClick("8") },
				"8"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "nine", class: "number", onClick: handleClick("9") },
				"9"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "clear", onClick: handleClick("clear") },
				"AC"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "four", class: "number", onClick: handleClick("4") },
				"4"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "five", class: "number", onClick: handleClick("5") },
				"5"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "six", class: "number", onClick: handleClick("6") },
				"6"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "multiply", class: "operator", onClick: handleClick("*") },
				"*"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "divide", class: "operator", onClick: handleClick("/") },
				"/"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "one", class: "number", onClick: handleClick("1") },
				"1"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "two", class: "number", onClick: handleClick("2") },
				"2"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "three", class: "number", onClick: handleClick("3") },
				"3"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "add", class: "operator", onClick: handleClick("+") },
				"+"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "subtract", class: "operator", onClick: handleClick("-") },
				"-"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "zero", class: "number", onClick: handleClick("0") },
				"0"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "decimal", onClick: handleClick(".") },
				"."
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "equals", onClick: handleClick("equals") },
				"="
			)
		)
	);
};

ReactDOM.render(
	/*#__PURE__*/ React.createElement(App, null),
	document.getElementById("root")
);
