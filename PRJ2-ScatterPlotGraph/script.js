import * as d3 from "https://esm.sh/d3";

document.addEventListener("DOMContentLoaded", () => {
	const req = new XMLHttpRequest();
	const url =
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
	req.open("GET", url, true);
	req.send();
	req.onload = () => {
		if (req.status >= 200 && req.status < 400) {
			const json = JSON.parse(req.responseText);
			BuildScatterPlotGraph(json);
		} else {
			console.log("Failed to load JSON data");
		}
	};
});

const getColor = (doping) => {
	return doping === "" ? "#002D62" : "#9e1b32";
};

const BuildScatterPlotGraph = (data) => {
	const years = data.map((d) => d.Year);
	const times = data.map((d) => {
		const [minutes, seconds] = d.Time.split(":").map(Number);
		return new Date(0, 0, 0, 0, minutes, seconds);
	});

	const w = 800;
	const h = 600;
	const padding = 60;

	const xScale = d3
		.scaleLinear()
		.domain([d3.min(years) - 1, d3.max(years) + 1])
		.range([padding, w - padding]);

	const maxTime = new Date(d3.max(times));
	maxTime.setSeconds(maxTime.getSeconds() + 10);
	const minTime = new Date(d3.min(times));
	minTime.setSeconds(minTime.getSeconds() - 10);
	const yScale = d3
		.scaleTime()
		.domain([maxTime, minTime])
		.range([h - padding, padding]);

	const integerFormat = d3.format("d");
	const xAxis = d3.axisBottom(xScale).tickFormat(integerFormat);

	const timeFormat = d3.timeFormat("%M:%S");
	const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

	const svg = d3
		.select("body")
		.append("svg")
		.attr("id", "scatter-plot-graph")
		.attr("width", w)
		.attr("height", h);

	const title = svg
		.append("foreignObject")
		.attr("id", "title")
		.attr("width", w)
		.attr("height", padding)
		.style("text-align", "center");
	title.append("xhtml:h2").text("Doping in Professional Bicycle Racing");
	title.append("xhtml:h3").text("35 Fastest times up Alpe d'Huez");

	svg
		.append("g")
		.attr("id", "x-axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);

	svg
		.append("text")
		.attr("id", "y-axis-label")
		.attr("x", -(padding * 3))
		.attr("y", 12)
		.attr("transform", "rotate(-90)")
		.text("Time in Minutes");

	svg
		.append("g")
		.attr("id", "y-axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

	const tooltip = d3
		.select("body")
		.append("div")
		.attr("id", "tooltip")
		.style("opacity", 0);

	svg
		.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("data-xvalue", (d, i) => years[i])
		.attr("data-yvalue", (d, i) => times[i])
		.attr("cx", (d, i) => xScale(years[i]))
		.attr("cy", (d, i) => yScale(times[i]))
		.attr("r", 6)
		.style("fill", (d) => getColor(d.Doping))
		.on("mouseover", (event, d) => {
			tooltip.style("opacity", 1);
			tooltip.attr("data-year", d.Year);
			tooltip
				.html(
					d.Name +
						": " +
						d.Nationality +
						"<br/>" +
						"Year: " +
						d.Year +
						", Time: " +
						d.Time +
						(d.Doping ? "<br/><br/>" + d.Doping : "")
				)
				.style("left", event.pageX + 20 + "px")
				.style("top", event.pageY - 40 + "px");
		})
		.on("mouseout", () => {
			tooltip.style("opacity", 0);
		});

	const legend = svg.append("g").attr("id", "legend");

	legend
		.append("rect")
		.attr("x", w - padding - 20)
		.attr("y", h / 2 - 15)
		.attr("width", 25)
		.attr("height", 25)
		.attr("fill", getColor(""));
	legend
		.append("text")
		.attr("x", w - padding - 30)
		.attr("y", h / 2 + 2)
		.style("text-anchor", "end")
		.text("No doping allegations");

	legend
		.append("rect")
		.attr("x", w - padding - 20)
		.attr("y", h / 2 + 15)
		.attr("width", 25)
		.attr("height", 25)
		.attr("fill", getColor("isAlleged"));
	legend
		.append("text")
		.attr("x", w - padding - 30)
		.attr("y", h / 2 + 32)
		.style("text-anchor", "end")
		.text("Riders with doping allegations");
};
