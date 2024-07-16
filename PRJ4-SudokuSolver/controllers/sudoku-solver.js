class SudokuSolver {
	validate(puzzleString) {
		if (!puzzleString || puzzleString.length !== 81) {
			return false;
		}
		return /^[1-9.]+$/.test(puzzleString);
	}

	checkRowPlacement(puzzleString, row, column, value) {
		const start = row * 9;
		for (let i = 0; i < 9; i++) {
			if (puzzleString[start + i] == value) {
				return false;
			}
		}
		return true;
	}

	checkColPlacement(puzzleString, row, column, value) {
		for (let i = 0; i < 9; i++) {
			if (puzzleString[column + i * 9] == value) {
				return false;
			}
		}
		return true;
	}

	checkRegionPlacement(puzzleString, row, column, value) {
		const startRow = Math.floor(row / 3) * 3;
		const startCol = Math.floor(column / 3) * 3;
		for (let r = 0; r < 3; r++) {
			for (let c = 0; c < 3; c++) {
				if (puzzleString[(startRow + r) * 9 + startCol + c] == value) {
					return false;
				}
			}
		}
		return true;
	}

	solve(puzzleString) {
		if (!this.validate(puzzleString)) {
			return false;
		}

		const board = puzzleString.split("");

		const solveBoard = (board) => {
			for (let i = 0; i < 81; i++) {
				if (board[i] === ".") {
					for (let num = 1; num <= 9; num++) {
						const value = num.toString();
						const row = Math.floor(i / 9);
						const col = i % 9;
						if (
							this.checkRowPlacement(board.join(""), row, col, value) &&
							this.checkColPlacement(board.join(""), row, col, value) &&
							this.checkRegionPlacement(board.join(""), row, col, value)
						) {
							board[i] = value;
							if (solveBoard(board)) {
								return true;
							}
							board[i] = ".";
						}
					}
					return false;
				}
			}
			return true;
		};

		if (solveBoard(board)) {
			return board.join("");
		} else {
			return false;
		}
	}
}

module.exports = SudokuSolver;
