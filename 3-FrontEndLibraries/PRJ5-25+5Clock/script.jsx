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

	return (
		<div id="labels">
			<div id="break">
				<div id="break-label">Break Length</div>
				<div id="break-controls">
					<div id="break-decrement" onClick={() => handleDec(BREAK_LENGTH)}>
						<i class="fa-solid fa-circle-down"></i>
					</div>
					<div id="break-length">{breakLength}</div>
					<div id="break-increment" onClick={() => handleInc(BREAK_LENGTH)}>
						<i class="fa-solid fa-circle-up"></i>
					</div>
				</div>
			</div>

			<div id="session">
				<div id="session-label">Session Length</div>
				<div id="session-controls">
					<div id="session-decrement" onClick={() => handleDec(SESSION_LENGTH)}>
						<i class="fa-solid fa-circle-down"></i>
					</div>
					<div id="session-length">{sessionLength}</div>
					<div id="session-increment" onClick={() => handleInc(SESSION_LENGTH)}>
						<i class="fa-solid fa-circle-up"></i>
					</div>
				</div>
			</div>
		</div>
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

	return (
		<div id="timer">
			<div id="timer-label">{timerLabel}</div>
			<audio
				ref={audio}
				id="beep"
				src="https://audio.jukehost.co.uk/mEOMN9QGAPXEkQyqL2OVNDAU02QHvdxx"
				preload="auto"
			></audio>
			<div id="time-left">
				{formatTime(Math.floor(timeLeft / 60))}:{formatTime(timeLeft % 60)}
			</div>
		</div>
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

	return (
		<div id="controls">
			<div id="start_stop" onClick={() => handlePlay()}>
				{isPlay ? (
					<i class="fa-regular fa-circle-pause"></i>
				) : (
					<i class="fa-regular fa-circle-play"></i>
				)}
			</div>
			<div id="reset" onClick={() => handleReset()}>
				<i class="fa-solid fa-arrows-rotate"></i>
			</div>
		</div>
	);
};

const App = () => {
	return (
		<div id="app">
			<h1>eNKay's Clock</h1>
			<Labels />
			<Timer />
			<Controls />
		</div>
	);
};

// Render
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
