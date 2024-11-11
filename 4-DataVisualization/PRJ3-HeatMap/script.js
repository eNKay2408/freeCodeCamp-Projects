import * as d3 from "https://esm.sh/d3";

document.addEventListener("DOMContentLoaded", () => {
	const req = new XMLHttpRequest();
	const url =
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
	req.open("GET", url, true);
	req.send();
	req.onload = () => {
		if (req.status >= 200 && req.status < 400) {
			const json = JSON.parse(req.responseText);
			BuildHeatMap(json);
		} else {
			console.log("Failed to load JSON data");
		}
	};
});

const colors = [
	"#313695",
	"#4575b4",
	"#74add1",
	"#abd9e9",
	"#e0f3f8",
	"#ffffbf",
	"#fee090",
	"#fdae61",
	"#f46d43",
	"#d73027",
	"#a50026",
];

const range = [1.7, 2.8, 3.9, 5, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8, 13.9];

const BuildHeatMap = (dataset) => {
	const { baseTemperature, monthlyVariance: data } = dataset;

	const width = 1400;
	const height = 600;
	const padding = 80;

	const xScale = d3
		.scaleLinear()
		.domain([d3.min(data, (d) => d.year), d3.max(data, (d) => d.year) + 1])
		.range([padding, width - padding]);

	const yScale = d3
		.scaleLinear()
		.domain([
			d3.max(data, (d) => d.month) + 0.55,
			d3.min(data, (d) => d.month) - 0.5,
		])
		.range([height - padding, padding]);

	const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(20);

	const nameMonths = [
		"",
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const yAxis = d3.axisLeft(yScale).tickFormat((d) => nameMonths[d]);

	const svg = d3
		.select("body")
		.append("svg")
		.attr("id", "heat-map")
		.attr("width", width)
		.attr("height", height);

	const title = svg
		.append("foreignObject")
		.attr("width", width)
		.attr("height", padding)
		.style("text-align", "center");

	title
		.append("xhtml:h1")
		.attr("id", "title")
		.text("Monthly Global Land-Surface Temperature");
	title
		.append("xhtml:h2")
		.attr("id", "description")
		.text("1753 - 2015: base temperature " + baseTemperature);

	const xAxisContainer = svg
		.append("g")
		.attr("id", "x-axis")
		.attr("transform", "translate(0," + (height - padding) + ")")
		.call(xAxis);

	xAxisContainer
		.append("text")
		.attr("id", "x-axis-label")
		.attr("transform", "translate(" + width / 2 + "," + padding / 2 + ")")
		.text("Years");

	const yAxisContainer = svg
		.append("g")
		.attr("id", "y-axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

	yAxisContainer
		.append("text")
		.attr("id", "y-axis-label")
		.attr(
			"transform",
			"translate(" + -padding / 1.2 + "," + height / 2.2 + ") rotate(-90)"
		)
		.text("Months");

	const getColorCell = (temp) => {
		const index = range.findIndex((r) => temp < r);
		return colors[index - 1];
	};

	const map = svg.append("g").attr("id", "map");

	const tooltip = d3
		.select("body")
		.append("div")
		.attr("id", "tooltip")
		.style("opacity", 0)
		.style("position", "absolute");

	map
		.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "cell")
		.attr("data-month", (d) => d.month)
		.attr("data-year", (d) => d.year)
		.attr("data-temp", (d) => d.variance + baseTemperature)
		.attr("x", (d) => xScale(d.year))
		.attr("y", (d) => yScale(d.month) - 20)
		.attr("width", 5)
		.attr("height", 40)
		.style("fill", (d) => getColorCell(d.variance + baseTemperature))
		.on("mouseover", (e, d) => {
			tooltip.style("opacity", 0.9);
			tooltip.attr("data-year", d.year);
			tooltip
				.html(
					`${d.year} - ${nameMonths[d.month]}
					<br/>
					${(d.variance + baseTemperature).toFixed(2)}°C
					<br/>
					${d.variance.toFixed(2)}°C`
				)
				.style("left", e.pageX + 20 + "px")
				.style("top", e.pageY - 30 + "px");
			tooltip.style(
				"background-color",
				getColorCell(d.variance + baseTemperature)
			);
		})
		.on("mouseout", () => {
			tooltip.style("opacity", 0);
		});

	const legend = svg
		.append("g")
		.attr("id", "legend")
		.attr(
			"transform",
			"translate(" + padding + ", " + (height - padding / 4) + ")"
		);

	const legendWidth = 400;
	const legendRectHeight = 20;
	const legendRectWidth = legendWidth / colors.length;

	const legendScale = d3
		.scaleLinear()
		.domain([d3.min(range), d3.max(range)])
		.range([0, legendWidth]);

	const legendAxis = d3
		.axisBottom(legendScale)
		.tickValues(range)
		.tickFormat(d3.format(".1f"));

	legend.append("g").call(legendAxis).attr("transform", "translate(0,0)");

	legend
		.selectAll("rect")
		.data(colors)
		.enter()
		.append("rect")
		.attr("x", (d, i) => i * legendRectWidth)
		.attr("y", -legendRectHeight)
		.attr("width", legendRectWidth)
		.attr("height", legendRectHeight)
		.style("fill", (d) => d);
};
