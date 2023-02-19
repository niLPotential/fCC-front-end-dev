const sampleMarkdown = `# Heading Element

## Sub Heading Element

[Link to freeCodeCamp](https://www.freecodecamp.org/)

\`inline code\`

    code block

1. list item

> blockquote

![image](path "title")

**bolded text**
`;

const editorElem = document.getElementById("editor");
const previewElem = document.getElementById("preview");

marked.setOptions({ breaks: true });

editorElem.value = sampleMarkdown;
previewElem.innerHTML = marked.parse(editorElem.value);

editorElem.addEventListener("input", handleEditorInput);

function handleEditorInput(event) {
  previewElem.innerHTML = marked.parse(event.target.value);
}
