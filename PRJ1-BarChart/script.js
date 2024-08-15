import * as d3 from "https://esm.sh/d3";

document.addEventListener("DOMContentLoaded", () => {
	const req = new XMLHttpRequest();
	const url =
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
	req.open("GET", url, true);
	req.send();
	req.onload = () => {
		if (req.status >= 200 && req.status < 400) {
			const json = JSON.parse(req.responseText);
			BuildBarChart(json.data);
		} else {
			console.log("Failed to load JSON data");
		}
	};
});

const BuildBarChart = (dataset) => {
	const dates = dataset.map((data) => new Date(data[0]));

	const w = 800;
	const h = 500;
	const padding = 60;

	const maxDate = new Date(d3.max(dates));
	maxDate.setMonth(maxDate.getMonth() + 5);
	const xScale = d3
		.scaleTime()
		.domain([d3.min(dates), maxDate])
		.range([padding, w - padding]);
	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(dataset, (d) => d[1])])
		.range([h - padding, padding]);

	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);

	const svg = d3
		.select("#bar-chart")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	const barWidth = (w - 2 * padding) / dataset.length;
	svg
		.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("data-date", (d) => d[0])
		.attr("data-gdp", (d) => d[1])
		.attr("x", (d, i) => xScale(dates[i]))
		.attr("y", (d) => yScale(d[1]))
		.attr("width", barWidth)
		.attr("height", (d) => h - padding - yScale(d[1]));

	svg
		.append("g")
		.attr("id", "x-axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);

	svg
		.append("g")
		.attr("id", "y-axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

	const bars = d3.selectAll(".bar");
	const tooltip = d3.select("#bar-chart").append("div").attr("id", "tooltip");

	bars.on("mouseover", (event) => {
		const dataDate = event.target.getAttribute("data-date");
		const dataGDP = event.target.getAttribute("data-gdp");

		tooltip
			.style("opacity", 0.8)
			.attr("data-date", dataDate)
			.attr("data-gdp", dataGDP)
			.html(
				`<strong>Date: </strong>${dataDate}
				<br>
				<strong>GDP: </strong>${dataGDP}`
			)
			.style("left", xScale(new Date(dataDate)) + "px")
			.style("top", yScale(dataGDP) + "px");
	});

	bars.on("mouseout", () => {
		tooltip.style("opacity", 0);
	});
};
