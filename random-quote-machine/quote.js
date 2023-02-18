main();

async function main() {
  const quote = await getRandomQuote();

  console.log(quote);
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
