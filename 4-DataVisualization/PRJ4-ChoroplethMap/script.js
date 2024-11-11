import * as d3 from "https://esm.sh/d3";
import * as topojson from "https://esm.sh/topojson-client";

document.addEventListener("DOMContentLoaded", () => {
	const urlEducation =
		"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
	const urlCounty =
		"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

	Promise.all([
		fetch(urlEducation).then((response) => response.json()),
		fetch(urlCounty).then((response) => response.json()),
	]).then((data) => {
		buildChoroplethMap(data[0], data[1]);
	});
});

const buildChoroplethMap = (dataEducation, dataCounty) => {
	d3.select("body")
		.append("h1")
		.attr("id", "title")
		.text("United States Educational Attainment");
	d3.select("body")
		.append("h3")
		.attr("id", "description")
		.text(
			"Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
		);

	const width = 960;
	const height = 600;

	const svg = d3
		.select("body")
		.append("svg")
		.attr("id", "choropleth-map")
		.attr("width", width)
		.attr("height", height);

	const colors = [
		"rgb(255, 255, 204)",
		"rgb(161, 218, 180)",
		"rgb(65, 182, 196)",
		"rgb(44, 127, 184)",
		"rgb(165, 0, 38)",
	];

	const getColor = (percentage) => {
		if (percentage < 15) {
			return colors[0];
		} else if (percentage < 30) {
			return colors[1];
		} else if (percentage < 45) {
			return colors[2];
		} else if (percentage < 60) {
			return colors[3];
		} else {
			return colors[4];
		}
	};

	const tooltip = d3
		.select("body")
		.append("div")
		.attr("id", "tooltip")
		.style("opacity", 0)
		.style("position", "absolute");

	const path = d3.geoPath();

	svg
		.append("g")
		.selectAll("path")
		.data(topojson.feature(dataCounty, dataCounty.objects.counties).features)
		.enter()
		.append("path")
		.attr("class", "county")
		.attr("data-fips", (d) => d.id)
		.attr("data-education", (d) => {
			const county = dataEducation.find((county) => county.fips === d.id);
			return county.bachelorsOrHigher;
		})
		.attr("d", path)
		.style("fill", (d) => {
			const county = dataEducation.find((county) => county.fips === d.id);
			return getColor(county.bachelorsOrHigher);
		})
		.on("mouseover", (event, d) => {
			const county = dataEducation.find((county) => county.fips === d.id);
			tooltip
				.style("opacity", 0.9)
				.attr("data-education", county.bachelorsOrHigher)
				.style("left", `${event.pageX + 10}px`)
				.style("top", `${event.pageY - 20}px`)
				.html(
					`${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`
				);
		})
		.on("mouseout", () => {
			tooltip.style("opacity", 0);
		});

	const legend = svg.append("g").attr("id", "legend");
	const legendWidth = 300;
	const legendHeight = 20;
	const legendX = 550;
	const legendY = 0;
	const legendRectWidth = legendWidth / colors.length;

	legend
		.selectAll("rect")
		.data(colors)
		.enter()
		.append("rect")
		.attr("x", (d, i) => legendX + i * legendRectWidth)
		.attr("y", legendY)
		.attr("width", legendRectWidth)
		.attr("height", legendHeight)
		.style("fill", (d) => d);

	const xScale = d3
		.scaleLinear()
		.domain([0, 75])
		.range([legendX, legendX + legendWidth]);
	const xAxis = d3
		.axisBottom(xScale)
		.tickValues([0, 15, 30, 45, 60, 75])
		.tickFormat((d) => `${d}%`);

	legend
		.append("g")
		.attr("transform", `translate(0, ${legendY + legendHeight})`)
		.call(xAxis);
};
