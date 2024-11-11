// .json
const quotes = [
	{
		text: "Xink dzai nhất phòng",
		author: "eNKay",
	},

	{
		text: "Vua trồng mít",
		author: "Original NVK",
	},

	{
		text: "Chú cáo vui",
		author: "Đại ca",
	},

	{
		text: "Hả hả hả?",
		author: "Vân Chín",
	},

	{
		text: "Nghiện bánh tráng",
		author: "Phúc Hehe",
	},
];

const colors = [
	{ text: "#F44336", back: "#E57373" },
	{ text: "#2196F3", back: "#64B5F6" },
	{ text: "#009688", back: "#4DB6AC" },
	{ text: "#FF5722", back: "#FF8A65" },
	{ text: "#78909C", back: "#B0BEC5" },
];

// jQuery & Bootstrap
import $ from "https://esm.sh/jquery";

$(document).ready(function () {
	$(".button").addClass("btn text-white");
	$("#app").addClass("text-center");
});

// Redux:
const CHANGE = "CHANGE";

const getRandomIndex = (length) => {
	return Math.floor(Math.random() * length);
};

const newQuote = (quote) => {
	return {
		type: CHANGE,
		quote: quote,
	};
};

const quoteReducer = (
	state = quotes[getRandomIndex(quotes.length)],
	action
) => {
	switch (action.type) {
		case CHANGE:
			return action.quote;
		default:
			return state;
	}
};

const store = Redux.createStore(quoteReducer);

// React:

// QuoteBox

class QuoteBox extends React.Component {
	constructor(props) {
		super(props);
		this.handleNewQuote = this.handleNewQuote.bind(this);
		this.changeColor = this.changeColor.bind(this);
	}

	handleNewQuote() {
		const newQuote = quotes[getRandomIndex(quotes.length)];
		this.props.randomNewQuote(newQuote);
	}

	componentDidMount() {
		this.changeColor();
	}

	componentDidUpdate() {
		this.changeColor();
	}

	changeColor() {
		$("#quote-box, #author").css({
			color: this.props.color.text,
			transition: "color 1s ease-in-out",
		});

		$("body, .button").css({
			backgroundColor: this.props.color.back,
			transition: "background-color 2s ease-in-out",
		});
	}

	render() {
		return /*#__PURE__*/ React.createElement(
			"div",
			{ id: "quote-box" } /*#__PURE__*/,
			React.createElement(
				"div",
				{ id: "quote-text" } /*#__PURE__*/,
				React.createElement("i", { class: "fa fa-quote-left" }) /*#__PURE__*/,
				React.createElement("span", { id: "text" }, " ", this.props.text)
			) /*#__PURE__*/,

			React.createElement(
				"div",
				{ id: "author" },
				this.props.author
			) /*#__PURE__*/,

			React.createElement(
				"div",
				{ id: "buttons", class: "row" } /*#__PURE__*/,
				React.createElement(
					"div",
					{ class: "col-md-3" } /*#__PURE__*/,
					React.createElement(
						"a",
						{
							id: "tweet-quote",
							class: "button",
							target: "_top",
							title: "Tweet hong <3",
							href: this.props.urlTweet,
						} /*#__PURE__*/,

						React.createElement("i", { class: "fa-brands fa-twitter" })
					)
				) /*#__PURE__*/,

				React.createElement(
					"div",
					{ class: "col-md-6" } /*#__PURE__*/,
					React.createElement(
						"button",
						{ id: "new-quote", class: "button", onClick: this.handleNewQuote },
						"New Quote"
					)
				) /*#__PURE__*/,

				React.createElement(
					"div",
					{ class: "col-md-3" } /*#__PURE__*/,
					React.createElement(
						"a",
						{
							id: "post-quote",
							class: "button",
							target: "_blank",
							title: "Post temple n\xE8!",
							href: "\nhttps://www.facebook.com/share.php?u=https://codepen.io/pen?template=LYvmqJZ",
						} /*#__PURE__*/,

						React.createElement("i", { class: "fa-brands fa-facebook" })
					)
				)
			)
		);
	}
}

// App
class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return /*#__PURE__*/ React.createElement(
			"div",
			{ id: "app", class: "container-fluid" } /*#__PURE__*/,
			React.createElement(QuoteBox, this.props) /*#__PURE__*/,
			React.createElement(
				"a",
				{
					id: "developer",
					href: "https://github.com/eNKay2408",
					target: "_blank",
				},
				"by eNKay"
			)
		);
	}
}

// Connect React-Redux
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = (state) => {
	return {
		text: state.text,
		author: state.author,
		color: colors[getRandomIndex(colors.length)],
		urlTweet:
			"https://twitter.com/intent/tweet?hashtags=quote&text=" +
			encodeURIComponent('"' + state.text + '"\n' + state.author),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		randomNewQuote: (quote) => {
			dispatch(newQuote(quote));
		},
	};
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

class AppWrapper extends React.Component {
	render() {
		return /*#__PURE__*/ React.createElement(
			Provider,
			{ store: store } /*#__PURE__*/,
			React.createElement(Container, null)
		);
	}
}

ReactDOM.render(
	/*#__PURE__*/ React.createElement(AppWrapper, null),
	document.getElementById("root")
);
