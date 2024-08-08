import Collectible from "./Collectible.cjs";
import Player from "./Player.cjs";

const socket = io();
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");
