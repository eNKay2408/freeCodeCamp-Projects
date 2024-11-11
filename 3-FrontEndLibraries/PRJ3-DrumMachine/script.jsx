import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import * as ReactRedux from "https://esm.sh/react-redux";
import * as Redux from "https://esm.sh/redux";

// json
const HEATER = [
	{
		keyCode: 81,
		keyTrigger: "Q",
		id: "Heater-1",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
	},
	{
		keyCode: 87,
		keyTrigger: "W",
		id: "Heater-2",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
	},
	{
		keyCode: 69,
		keyTrigger: "E",
		id: "Heater-3",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
	},
	{
		keyCode: 65,
		keyTrigger: "A",
		id: "Heater-4",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
	},
	{
		keyCode: 83,
		keyTrigger: "S",
		id: "Clap",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
	},
	{
		keyCode: 68,
		keyTrigger: "D",
		id: "Open-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
	},
	{
		keyCode: 90,
		keyTrigger: "Z",
		id: "Kick-n'-Hat",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
	},
	{
		keyCode: 88,
		keyTrigger: "X",
		id: "Kick",
		url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
	},
	{
		keyCode: 67,
		keyTrigger: "C",
		id: "Closed-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
	},
];

const PIANO = [
	{
		keyCode: 81,
		keyTrigger: "Q",
		id: "Chord-1",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
	},
	{
		keyCode: 87,
		keyTrigger: "W",
		id: "Chord-2",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
	},
	{
		keyCode: 69,
		keyTrigger: "E",
		id: "Chord-3",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
	},
	{
		keyCode: 65,
		keyTrigger: "A",
		id: "Shaker",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
	},
	{
		keyCode: 83,
		keyTrigger: "S",
		id: "Open-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
	},
	{
		keyCode: 68,
		keyTrigger: "D",
		id: "Closed-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
	},
	{
		keyCode: 90,
		keyTrigger: "Z",
		id: "Punchy-Kick",
		url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
	},
	{
		keyCode: 88,
		keyTrigger: "X",
		id: "Side-Stick",
		url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
	},
	{
		keyCode: 67,
		keyTrigger: "C",
		id: "Snare",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
	},
];

// Redux
const POWER = "POWER";
const DISPLAY = "DISPLAY";
const MODE = "MODE";
const VOLUME = "VOLUME";

const change = (type, value) => {
	return {
		type: type,
		value: value,
	};
};

const initialState = {
	power: true,
	display: "Welcome to Drum Machine",
	mode: true,
	volume: 0.5,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case POWER:
			return { ...state, power: action.value };
		case DISPLAY:
			return { ...state, display: action.value };
		case MODE:
			return { ...state, mode: action.value };
		case VOLUME:
			return { ...state, volume: action.value };
		default:
			return state;
	}
};

const store = Redux.createStore(reducer);

// React
const Controls = () => {
	const power = ReactRedux.useSelector((state) => state.power);
	const display = ReactRedux.useSelector((state) => state.display);
	const mode = ReactRedux.useSelector((state) => state.mode);
	const volume = ReactRedux.useSelector((state) => state.volume);

	const dispatch = ReactRedux.useDispatch();
	const updateDisplay = (value) => {
		dispatch(change(DISPLAY, value));
	};
	const changePower = () => {
		dispatch(change(POWER, !power));
		updateDisplay("Power: " + (power ? "OFF" : "ON"));
	};
	const changeMode = () => {
		dispatch(change(MODE, !mode));
		updateDisplay("Mode: " + (mode ? "Smooth Piano Kit" : "Heater Kit"));
	};
	const adjustVolume = (event) => {
		dispatch(change(VOLUME, event.target.value));
		updateDisplay("Volume: " + Math.floor(100 * event.target.value));
	};

	return (
		<div id="controls">
			<input
				id="volume"
				type="range"
				class="form-range"
				min="0"
				max="1"
				step="0.01"
				value={volume}
				onChange={adjustVolume}
			/>
			<div id="display">{display}</div>
			<div id="control-btns">
				<div id="power">
					Power
					<div class="control-btn" onClick={changePower}>
						<div
							class="inner"
							style={power ? { float: "right" } : { float: "left" }}
						/>
					</div>
				</div>
				<div id="mode">
					Mode
					<div id="mode" class="control-btn" onClick={changeMode}>
						<div
							class="inner"
							style={mode ? { float: "right" } : { float: "left" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const DrumPad = (props) => {
	const power = ReactRedux.useSelector((state) => state.power);
	const volume = ReactRedux.useSelector((state) => state.volume);
	const dispatch = ReactRedux.useDispatch();

	const playSound = () => {
		const ele = document.getElementById(props.keyTrigger);
		ele.volume = volume;
		ele.currentTime = 0;
		ele.play();
	};

	const updateDisplay = () => {
		dispatch(change(DISPLAY, props.id.replaceAll("-", " ")));
	};

	const activePad = () => {
		const element = document.getElementById(props.id);
		element.classList.remove("btn-dark");
		element.classList.add("btn-danger");
		setTimeout(() => {
			element.classList.remove("btn-danger");
			element.classList.add("btn-dark");
		}, 400);
	};

	const handle = () => {
		activePad();
		playSound();
		updateDisplay();
	};

	const handlePress = (event) => {
		if (event.keyCode === props.keyCode && power) handle();
	};

	const handleClick = () => {
		if (power) handle();
	};

	React.useEffect(() => {
		document.addEventListener("keydown", handlePress);
		return () => {
			document.removeEventListener("keydown", handlePress);
		};
	}, [handlePress]);

	return (
		<button class="drum-pad btn btn-dark" id={props.id} onClick={handleClick}>
			<audio class="clip" id={props.keyTrigger} src={props.url} />
			{props.keyTrigger}
		</button>
	);
};

const Drum = () => {
	const mode = ReactRedux.useSelector((state) => state.mode);

	return (
		<div id="drum">
			{mode
				? HEATER.map((value) => <DrumPad {...value} />)
				: PIANO.map((value) => <DrumPad {...value} />)}
		</div>
	);
};

const App = () => {
	return (
		<div id="drum-machine">
			<Drum />
			<Controls />
		</div>
	);
};

// Render
const Provider = ReactRedux.Provider;

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
