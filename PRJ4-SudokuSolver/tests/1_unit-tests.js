const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
const puzzlesAndSolutions = require("../controllers/puzzle-strings.js");

describe("Unit Tests", () => {
	it("Logic handles a valid puzzle string of 81 characters", () => {
		puzzlesAndSolutions.forEach(([puzzle]) => {
			assert.isTrue(
				solver.validate(puzzle),
				"Failed to validate valid puzzle string"
			);
		});
	});

	it("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
		const invalidPuzzle = puzzlesAndSolutions[0][0].replace("1", "X");
		assert.isFalse(
			solver.validate(invalidPuzzle),
			`Incorrectly validated puzzle with invalid characters`
		);
	});

	it("Logic handles a puzzle string that is not 81 characters in length", () => {
		const invalidPuzzle = puzzlesAndSolutions[0][0].slice(0, -1);
		assert.isFalse(
			solver.validate(invalidPuzzle),
			`Incorrectly validated puzzle with invalid length`
		);
	});

	it("Logic handles a valid row placement", () => {
		const puzzle = puzzlesAndSolutions[0][0];
		assert.isTrue(
			solver.checkRowPlacement(puzzle, 0, 1, "7"),
			"Failed to validate valid row placement"
		);
	});

	it("Logic handles an invalid row placement", () => {
		const puzzle = puzzlesAndSolutions[0][0];
		assert.isFalse(
			solver.checkRowPlacement(puzzle, 0, 1, "8"),
			"Incorrectly validated invalid row placement"
		);
	});

	it("Logic handles a valid column placement", () => {
		const puzzle = puzzlesAndSolutions[0][0];
		assert.isTrue(
			solver.checkColPlacement(puzzle, 0, 1, "5"),
			"Failed to validate valid column placement"
		);
	});

	it("Logic handles an invalid column placement", () => {
		const puzzle = puzzlesAndSolutions[0][0];
		assert.isFalse(
			solver.checkColPlacement(puzzle, 0, 1, "6"),
			"Incorrectly validated invalid column placement"
		);
	});

	it("Logic handles a valid region (3x3 grid) placement", () => {
		const puzzle = puzzlesAndSolutions[0][0];
		assert.isTrue(
			solver.checkRegionPlacement(puzzle, 0, 1, "3"),
			"Failed to validate valid region placement"
		);
	});

	it("Logic handles an invalid region (3x3 grid) placement", () => {
		const puzzle = puzzlesAndSolutions[0][0];
		assert.isFalse(
			solver.checkRegionPlacement(puzzle, 0, 1, "2"),
			"Incorrectly validated invalid region placement"
		);
	});

	it("Valid puzzle string pass the solver", () => {
		puzzlesAndSolutions.forEach(([puzzle]) => {
			const solution = solver.solve(puzzle);
			assert.isString(solution, "Puzzle is not a string");
			assert.lengthOf(solution, 81, "Puzzle is not 81 characters long");
		});
	});

	it("Invalid puzzle string fail the solver", () => {
		const invalidPuzzle = puzzlesAndSolutions[0][0].replace("1", "3");
		const solution = solver.solve(invalidPuzzle);
		assert.isFalse(solution, "Invalid puzzle string passed the solver");
	});

	it("Solver returns the expected solution for an incomplete puzzle", () => {
		puzzlesAndSolutions.forEach(([puzzle, expectedSolution]) => {
			const solution = solver.solve(puzzle);
			assert.equal(
				solution,
				expectedSolution,
				"Solver returned incorrect solution for puzzle"
			);
		});
	});
});
