async function callAPI() {
  const res = await fetch("/api/hello");
  const data = await res.json();
  document.getElementById("result").textContent = data.message;
}

async function getQuote() {
  const res = await fetch("/api/quote");
  const data = await res.json();
  document.getElementById("quote").textContent = data.quote;
}