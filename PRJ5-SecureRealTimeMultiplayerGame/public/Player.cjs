class Player {
	constructor({ x, y, score, id }) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.score = score;
	}

	movePlayer(dir, speed) {
		switch (dir.toLowerCase()) {
			case "up":
				this.y -= speed;
				break;
			case "down":
				this.y += speed;
				break;
			case "left":
				this.x -= speed;
				break;
			case "right":
				this.x += speed;
				break;
			default:
				break;
		}
	}

	collision(item) {
		const playerSize = 50;
		const itemSize = 20;

		if (
			this.x < item.x + itemSize &&
			this.x + playerSize > item.x &&
			this.y < item.y + itemSize &&
			this.y + playerSize > item.y
		) {
			return true;
		}
		return false;
	}

	calculateRank(players) {
		players.sort((a, b) => b.score - a.score);
		let rank = players.findIndex((player) => player.id === this.id) + 1;
		return `Rank: ${rank}/${players.length}`;
	}
}

module.exports = Player;
