const apiPokemons = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const nameText = document.getElementById("pokemon-name");
const idText = document.getElementById("pokemon-id");
const weightText = document.getElementById("weight");
const separateText = document.querySelector(".separate");
const heightText = document.getElementById("height");
const spriteText = document.getElementById("sprite");
const typesText = document.getElementById("types");
const statsText = document.getElementById("stats");

const colorTypes = {
	normal: "#a8a87d",
	fire: "#e18643",
	water: "#708fe9",
	electric: "#f2d153",
	grass: "#8bc660",
	ice: "#a6d6d7",
	fighting: "#b13d30",
	poison: "#95469b",
	ground: "#dbc174",
	flying: "#a491ea",
	psychic: "#e66388",
	bug: "#abb742",
	rock: "#b4a14a",
	ghost: "#6c5994",
	dragon: "#693bef",
	dark: "#6c594a",
	steel: "#b8b8ce",
	fairy: "#e7b8bc",
	stellar: "#5aaae2",
};

let detailsPokemon = {};

const showInformation = () => {
	const { id, name, height, weight, sprites, stats, types } = detailsPokemon;

	idText.textContent = "#" + id;
	nameText.textContent = name[0].toUpperCase() + name.substring(1);
	heightText.textContent = height;
	separateText.textContent = "/";
	weightText.textContent = weight;
	spriteText.src = sprites.front_default;

	typesText.innerHTML = "";
	types.forEach((typeInfo) => {
		const typeName = typeInfo.type.name;
		const spanType = document.createElement("span");
		spanType.setAttribute("class", "type");
		spanType.textContent = typeName.toUpperCase();
		spanType.style.backgroundColor = colorTypes[typeName];
		typesText.appendChild(spanType);
	});

	stats.forEach((statInfo) => {
		const baseStat = statInfo.base_stat;
		const nameStat = statInfo.stat.name;
		const element = document.getElementById(nameStat);
		element.textContent = baseStat;
	});
};

const resetAll = () => {
	nameText.textContent = "";
	idText.textContent = "";
	heightText.textContent = "";
	separateText.textContent = "";
	weightText.textContent = "";
	spriteText.src = "";
	typesText.innerHTML = "";
	[
		"hp",
		"attack",
		"defense",
		"special-attack",
		"special-defense",
		"speed",
	].forEach((id) => {
		const spanStat = document.getElementById(id);
		spanStat.textContent = "";
	});
};

const fetchDetailsPokemon = async (urlPokemon) => {
	try {
		const res = await fetch(urlPokemon);
		detailsPokemon = await res.json();

		showInformation();
	} catch (err) {
		alert("Pokémon not found");
		resetAll();
		console.log(err);
	}
};

searchBtn.addEventListener("click", (event) => {
	event.preventDefault();
	const searchKey = searchInput.value.toLowerCase();
	fetchDetailsPokemon(apiPokemons + searchKey);

	searchInput.value = "";
});
