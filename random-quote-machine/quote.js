handleNewQuote();

document.getElementById("new-quote").addEventListener(
  "click",
  handleNewQuote,
);

async function handleNewQuote() {
  const quote = await getRandomQuote();

  document.getElementById("text").innerText = quote.text;
  document.getElementById("author").innerText = quote.author;
}

async function getRandomQuote() {
  let randomQuote = {};
  await fetch("./quotes.json").then((resp) => resp.json()).then(
    (data) => {
      const i = getRandomInt(data.length);
      randomQuote = { ...data[i] };
    },
  ).catch(console.error);

  return randomQuote;
}

function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}
