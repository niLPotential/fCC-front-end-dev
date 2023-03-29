const sampleMarkdown = `# Heading Element

## Sub Heading Element

[link](https://www.freecodecamp.org/)

\`inline code\`

    code block

1. list item

> blockquote

![freeCodeCamp Logo](https://raw.githubusercontent.com/freeCodeCamp/design-style-guide/main/assets/fcc_secondary_large_24X210.svg "freeCodeCamp Logo")

**bolded text**`;

const editorElem = document.getElementById("editor");
const previewElem = document.getElementById("preview");

marked.setOptions({ breaks: true });

editorElem.value = sampleMarkdown;
previewElem.innerHTML = marked.parse(editorElem.value);

editorElem.addEventListener("input", handleEditorInput);

function handleEditorInput(event) {
  previewElem.innerHTML = marked.parse(event.target.value);
}
