import * as d3 from "https://esm.sh/d3";

const DATASETS = {
	videoGames: {
		TITLE: "Video Game Sales",
		DESCRIPTION: "Top 100 Most Sold Video Games Grouped by Platform",
		FILE_PATH:
			"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",
		FILE_JSON: {},
	},
	movies: {
		TITLE: "Movie Sales",
		DESCRIPTION: "Top 100 Highest Grossing Movies Grouped By Genre",
		FILE_PATH:
			"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
		FILE_JSON: {},
	},
	kickStarter: {
		TITLE: "Kickstarter Pledges",
		DESCRIPTION:
			"Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
		FILE_PATH:
			"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
		FILE_JSON: {},
	},
};

const resetDataset = (dataset) => {
	const title = document.getElementById("title");
	const description = document.getElementById("description");
	const treemapDiagram = document.getElementById("treemap-diagram");
	const legend = document.getElementById("legend");
	const tooltip = document.getElementById("tooltip");

	title.textContent = DATASETS[dataset].TITLE;
	description.textContent = DATASETS[dataset].DESCRIPTION;

	if (treemapDiagram) {
		treemapDiagram.remove();
	}

	if (legend) {
		legend.remove();
	}

	if (tooltip) {
		tooltip.remove();
	}

	document.getElementById("btns-data-set").childNodes.forEach((child) => {
		if (child.id === `btn-${dataset}`) {
			child.style.color = "var(--color4)";
		} else {
			child.style.color = "var(--color1)";
		}
	});

	buildTreemapDiagram(DATASETS[dataset].FILE_JSON);
};

document.addEventListener("DOMContentLoaded", () => {
	const buttonsDataSet = document.createElement("div");
	buttonsDataSet.setAttribute("id", "btns-data-set");
	document.body.appendChild(buttonsDataSet);

	const buttonKickStarter = document.createElement("div");
	buttonKickStarter.setAttribute("id", "btn-kickStarter");
	buttonKickStarter.textContent = "Kickstarter";
	buttonsDataSet.appendChild(buttonKickStarter);
	buttonKickStarter.addEventListener("click", () => {
		resetDataset("kickStarter");
	});

	const buttonVideoGames = document.createElement("div");
	buttonVideoGames.setAttribute("id", "btn-videoGames");
	buttonVideoGames.textContent = "Video Games";
	buttonsDataSet.appendChild(buttonVideoGames);
	buttonVideoGames.addEventListener("click", () => {
		resetDataset("videoGames");
	});

	const buttonMovies = document.createElement("div");
	buttonMovies.setAttribute("id", "btn-movies");
	buttonMovies.textContent = "Movies";
	buttonsDataSet.appendChild(buttonMovies);
	buttonMovies.addEventListener("click", () => {
		resetDataset("movies");
	});

	const title = document.createElement("h1");
	title.setAttribute("id", "title");
	title.textContent = DATASETS.kickStarter.TITLE;
	document.body.appendChild(title);

	const description = document.createElement("p");
	description.setAttribute("id", "description");
	description.textContent = DATASETS.kickStarter.DESCRIPTION;
	document.body.appendChild(description);

	const urlKickStarter = DATASETS.kickStarter.FILE_PATH;
	const urlMovies = DATASETS.movies.FILE_PATH;
	const urlVideoGames = DATASETS.videoGames.FILE_PATH;

	Promise.all([fetch(urlKickStarter), fetch(urlMovies), fetch(urlVideoGames)])
		.then(async (responses) => {
			const kickStarterData = await responses[0].json();
			const moviesData = await responses[1].json();
			const videGamesData = await responses[2].json();

			DATASETS.kickStarter.FILE_JSON = kickStarterData;
			DATASETS.movies.FILE_JSON = moviesData;
			DATASETS.videoGames.FILE_JSON = videGamesData;

			resetDataset("kickStarter");
		})
		.catch((error) => {
			console.log("Error fetching data: ", error);
		});
});

const colors = [
	"#1f77b4",
	"#ff7f0e",
	"#2ca02c",
	"#d62728",
	"#9467bd",
	"#8c564b",
	"#e377c2",
	"#7f7f7f",
	"#bcbd22",
	"#17becf",
	"#1f77b4",
	"#ff7f0e",
	"#2ca02c",
	"#d62728",
	"#9467bd",
	"#8c564b",
	"#e377c2",
	"#7f7f7f",
	"#bcbd22",
	"#17becf",
];

const buildTreemapDiagram = (data) => {
	const width = 1200;
	const height = 720;

	const treemap = (data) =>
		d3.treemap().size([width, height]).padding(1)(
			d3
				.hierarchy(data)
				.sum((d) => d.value)
				.sort((a, b) => b.value - a.value)
		);

	const root = treemap(data);

	const categories = root.data.children.map((d) => d.name);

	const getColor = (category) => {
		const index = categories.indexOf(category);
		return colors[index];
	};

	const tooltip = d3
		.select("body")
		.append("div")
		.attr("id", "tooltip")
		.style("opacity", 0)
		.style("position", "absolute");

	const svg = d3
		.select("body")
		.append("svg")
		.attr("id", "treemap-diagram")
		.attr("width", width)
		.attr("height", height);

	const cell = svg
		.selectAll("g")
		.data(root.leaves())
		.enter()
		.append("g")
		.attr("transform", (d) => `translate(${d.x0},${d.y0})`)
		.on("mousemove", (e, d) => {
			tooltip.style("opacity", 0.9);
			tooltip
				.html(
					`Name: ${d.data.name}
                    <br>Category: ${d.data.category}
                    <br>Value: ${d.data.value}`
				)
				.attr("data-value", d.data.value)
				.style("left", e.pageX + 20 + "px")
				.style("top", e.pageY - 30 + "px");
		})
		.on("mouseout", () => {
			tooltip.style("opacity", 0);
		});

	cell
		.append("rect")
		.attr("fill", (d) => getColor(d.data.category))
		.attr("class", "tile")
		.attr("data-name", (d) => d.data.name)
		.attr("data-category", (d) => d.data.category)
		.attr("data-value", (d) => d.data.value)
		.attr("width", (d) => d.x1 - d.x0)
		.attr("height", (d) => d.y1 - d.y0);

	cell
		.append("text")
		.selectAll("tspan")
		.data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
		.enter()
		.append("tspan")
		.attr("class", "tile-text")
		.attr("x", 5)
		.attr("y", (d, i) => 15 + i * 15)
		.text((d) => d);

	const legendWidth = 750;
	const legendColumn = 4;
	const legendPadding = 5;
	const legendRectSize = 20;
	const legendItemWidth = legendWidth / legendColumn;
	const legendHeight =
		Math.ceil(categories.length / legendColumn) *
		(legendRectSize + legendPadding);

	const legend = d3
		.select("body")
		.append("svg")
		.attr("id", "legend")
		.style("transform", "translate(0, 10px)")
		.attr("width", legendWidth)
		.attr("height", legendHeight);

	const items = legend.selectAll("g").data(categories).enter().append("g");

	items
		.append("rect")
		.attr("class", "legend-item")
		.attr("x", (d, i) => (i % legendColumn) * legendItemWidth)
		.attr(
			"y",
			(d, i) => Math.floor(i / legendColumn) * (legendRectSize + legendPadding)
		)
		.attr("width", legendRectSize)
		.attr("height", legendRectSize)
		.attr("fill", (d) => getColor(d));

	items
		.append("text")
		.attr("class", "legend-text")
		.attr(
			"x",
			(d, i) => (i % legendColumn) * legendItemWidth + legendRectSize + 5
		)
		.attr(
			"y",
			(d, i) =>
				Math.floor(i / legendColumn) * (legendRectSize + legendPadding) + 16
		)
		.text((d) => d);
};
