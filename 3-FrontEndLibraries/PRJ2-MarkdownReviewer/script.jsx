import * as Marked from "https://esm.sh/marked";
import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const Editor = (props) => {
	return (
		<div id="editor-container">
			<header>
				<i class="fa-brands fa-markdown"></i>
				<span> EDITOR</span>
			</header>
			<textarea
				id="editor"
				value={props.editorText}
				onChange={props.handleEditorChange}
			/>
		</div>
	);
};

const Preview = ({ text }) => {
	Marked.setOptions({
		breaks: true,
	});
	const htmlText = Marked.parse(text);
	return (
		<div id="preview-container">
			<header>
				<i class="fa-solid fa-circle-info"></i>
				<span> PREVIEWER</span>
			</header>
			<div id="preview" dangerouslySetInnerHTML={{ __html: htmlText }} />
		</div>
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

	return (
		<div id="app">
			<Editor editorText={editorText} handleEditorChange={handleEditorChange} />
			<Preview text={editorText} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
