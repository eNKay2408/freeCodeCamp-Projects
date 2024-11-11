import React, { useEffect, useRef, useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { Provider, useDispatch, useSelector } from "https://esm.sh/react-redux";
import { createStore } from "https://esm.sh/redux";

// Redux
const change = (type, value) => {
	return {
		type: type,
		value: value,
	};
};

const initialState = {
	breakLength: 5,
	sessionLength: 25,
	timerLabel: "Session",
	timeLeft: 25 * 60,
	isPlay: false,
	audio: null,
};

const BREAK_LENGTH = "BREAK LENGTH";
const SESSION_LENGTH = "SESSION LENGTH";
const TIMER_LABEL = "TIMER LABEL";
const TIME_LEFT = "TIME LEFT";
const IS_PLAY = "IS PLAY";
const AUDIO = "AUDIO";
const RESET = "RESET";

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case BREAK_LENGTH:
			return { ...state, breakLength: action.value };
		case SESSION_LENGTH:
			return { ...state, sessionLength: action.value };
		case TIMER_LABEL:
			return { ...state, timerLabel: action.value };
		case TIME_LEFT:
			return { ...state, timeLeft: action.value };
		case IS_PLAY:
			return { ...state, isPlay: action.value };
		case AUDIO:
			return { ...state, audio: action.value };
		case RESET:
			return initialState;
		default:
			return state;
	}
};

const store = createStore(reducer);

// React
const Labels = () => {
	const breakLength = useSelector((state) => state.breakLength);
	const sessionLength = useSelector((state) => state.sessionLength);
	const timerLabel = useSelector((state) => state.timerLabel);
	const isPlay = useSelector((state) => state.isPlay);
	const dispatch = useDispatch();

	const handleDec = (type) => {
		if (!isPlay) {
			if (type === BREAK_LENGTH && breakLength > 1)
				dispatch(change(type, breakLength - 1));
			if (type === SESSION_LENGTH && sessionLength > 1)
				dispatch(change(type, sessionLength - 1));
		}
	};

	const handleInc = (type) => {
		if (!isPlay) {
			if (type === BREAK_LENGTH && breakLength < 60)
				dispatch(change(type, breakLength + 1));
			if (type === SESSION_LENGTH && sessionLength < 60)
				dispatch(change(type, sessionLength + 1));
		}
	};

	useEffect(() => {
		if (timerLabel === "Break") dispatch(change(TIME_LEFT, breakLength * 60));
	}, [breakLength]);

	useEffect(() => {
		if (timerLabel === "Session")
			dispatch(change(TIME_LEFT, sessionLength * 60));
	}, [sessionLength]);

	return /*#__PURE__*/ React.createElement(
		"div",
		{ id: "labels" } /*#__PURE__*/,
		React.createElement(
			"div",
			{ id: "break" } /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "break-label" },
				"Break Length"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "break-controls" } /*#__PURE__*/,
				React.createElement(
					"div",
					{
						id: "break-decrement",
						onClick: () => handleDec(BREAK_LENGTH),
					} /*#__PURE__*/,
					React.createElement("i", { class: "fa-solid fa-circle-down" })
				) /*#__PURE__*/,

				React.createElement(
					"div",
					{ id: "break-length" },
					breakLength
				) /*#__PURE__*/,
				React.createElement(
					"div",
					{
						id: "break-increment",
						onClick: () => handleInc(BREAK_LENGTH),
					} /*#__PURE__*/,
					React.createElement("i", { class: "fa-solid fa-circle-up" })
				)
			)
		) /*#__PURE__*/,

		React.createElement(
			"div",
			{ id: "session" } /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "session-label" },
				"Session Length"
			) /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "session-controls" } /*#__PURE__*/,
				React.createElement(
					"div",
					{
						id: "session-decrement",
						onClick: () => handleDec(SESSION_LENGTH),
					} /*#__PURE__*/,
					React.createElement("i", { class: "fa-solid fa-circle-down" })
				) /*#__PURE__*/,

				React.createElement(
					"div",
					{ id: "session-length" },
					sessionLength
				) /*#__PURE__*/,
				React.createElement(
					"div",
					{
						id: "session-increment",
						onClick: () => handleInc(SESSION_LENGTH),
					} /*#__PURE__*/,
					React.createElement("i", { class: "fa-solid fa-circle-up" })
				)
			)
		)
	);
};

const Timer = () => {
	const timerLabel = useSelector((state) => state.timerLabel);
	const timeLeft = useSelector((state) => state.timeLeft);
	const isPlay = useSelector((state) => state.isPlay);
	const breakLength = useSelector((state) => state.breakLength);
	const sessionLength = useSelector((state) => state.sessionLength);
	const audio = useRef(null);
	const [audioFlagDispatch, setAudioFlagDispatch] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(change(AUDIO, audio.current));
	}, [audioFlagDispatch]);

	useEffect(() => {
		if (isPlay) {
			const timeout = setTimeout(() => {
				dispatch(change(TIME_LEFT, timeLeft - 1));
			}, 1000);

			if (timeLeft === -1) {
				setAudioFlagDispatch(!audioFlagDispatch);
				console.log(audio);
				audio.current.currentTime = 0;
				audio.current.play();
				if (timerLabel === "Break") {
					dispatch(change(TIMER_LABEL, "Session"));
					dispatch(change(TIME_LEFT, sessionLength * 60));
				} else {
					dispatch(change(TIMER_LABEL, "Break"));
					dispatch(change(TIME_LEFT, breakLength * 60));
				}
			}
			return () => clearTimeout(timeout);
		}
	}, [timeLeft, isPlay]);

	const formatTime = (time) => {
		return time < 10 ? `0${time}` : time;
	};

	return /*#__PURE__*/ React.createElement(
		"div",
		{ id: "timer" } /*#__PURE__*/,
		React.createElement("div", { id: "timer-label" }, timerLabel) /*#__PURE__*/,
		React.createElement("audio", {
			ref: audio,
			id: "beep",
			src: "https://audio.jukehost.co.uk/mEOMN9QGAPXEkQyqL2OVNDAU02QHvdxx",
			preload: "auto",
		}) /*#__PURE__*/,
		React.createElement(
			"div",
			{ id: "time-left" },
			formatTime(Math.floor(timeLeft / 60)),
			":",
			formatTime(timeLeft % 60)
		)
	);
};

const Controls = () => {
	const isPlay = useSelector((state) => state.isPlay);
	const audio = useSelector((state) => state.audio);
	const dispatch = useDispatch();

	const handlePlay = () => {
		dispatch(change(IS_PLAY, !isPlay));
	};

	const handleReset = () => {
		if (audio) audio.pause();
		dispatch(change(RESET));
	};

	return /*#__PURE__*/ React.createElement(
		"div",
		{ id: "controls" } /*#__PURE__*/,
		React.createElement(
			"div",
			{ id: "start_stop", onClick: () => handlePlay() },
			isPlay
				? /*#__PURE__*/ React.createElement("i", {
						class: "fa-regular fa-circle-pause",
				  })
				: /*#__PURE__*/ React.createElement("i", {
						class: "fa-regular fa-circle-play",
				  })
		) /*#__PURE__*/,

		React.createElement(
			"div",
			{ id: "reset", onClick: () => handleReset() } /*#__PURE__*/,
			React.createElement("i", { class: "fa-solid fa-arrows-rotate" })
		)
	);
};

const App = () => {
	return /*#__PURE__*/ React.createElement(
		"div",
		{ id: "app" } /*#__PURE__*/,
		React.createElement("h1", null, "eNKay's Clock") /*#__PURE__*/,
		React.createElement(Labels, null) /*#__PURE__*/,
		React.createElement(Timer, null) /*#__PURE__*/,
		React.createElement(Controls, null)
	);
};

// Render
ReactDOM.render(
	/*#__PURE__*/ React.createElement(
		Provider,
		{ store: store },
		/*#__PURE__*/ React.createElement(App, null)
	),
	document.getElementById("root")
);
