import * as Marked from "https://esm.sh/marked";
import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const Editor = (props) => {
	return /*#__PURE__*/ React.createElement(
		"div",
		{ id: "editor-container" } /*#__PURE__*/,
		React.createElement(
			"header",
			null /*#__PURE__*/,
			React.createElement("i", {
				class: "fa-brands fa-markdown",
			}) /*#__PURE__*/,
			React.createElement("span", null, " EDITOR")
		) /*#__PURE__*/,

		React.createElement("textarea", {
			id: "editor",
			value: props.editorText,
			onChange: props.handleEditorChange,
		})
	);
};

const Preview = ({ text }) => {
	Marked.setOptions({
		breaks: true,
	});

	const htmlText = Marked.parse(text);
	return /*#__PURE__*/ React.createElement(
		"div",
		{ id: "preview-container" } /*#__PURE__*/,
		React.createElement(
			"header",
			null /*#__PURE__*/,
			React.createElement("i", {
				class: "fa-solid fa-circle-info",
			}) /*#__PURE__*/,
			React.createElement("span", null, " PREVIEWER")
		) /*#__PURE__*/,

		React.createElement("div", {
			id: "preview",
			dangerouslySetInnerHTML: { __html: htmlText },
		})
	);
};

const initialState = `# Hello World
## My name is eNKay
This is my [Github](https://github.com/eNKay2408)

\` const year = 2024; \`
\`\`\` 
// Javascript
const greet = () => {
  console.log("Hello " + year);
}
greet();
\`\`\`

Programing Languages I am using:
- Javascript
- Java
- Python

> No pain, no gain!

![Avatar](https://i.ibb.co/02C0njS/avtFCC.jpg)

**Thanks for using the program**
`;

const App = () => {
	const [editorText, setEditorText] = React.useState(initialState);

	const handleEditorChange = (event) => {
		setEditorText(event.target.value);
	};

	return /*#__PURE__*/ React.createElement(
		"div",
		{ id: "app" } /*#__PURE__*/,
		React.createElement(Editor, {
			editorText: editorText,
			handleEditorChange: handleEditorChange,
		}) /*#__PURE__*/,
		React.createElement(Preview, { text: editorText })
	);
};

ReactDOM.render(
	/*#__PURE__*/ React.createElement(App, null),
	document.getElementById("root")
);
