const quotes = [
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "The best time to plant a tree was twenty years ago. The second best time is now.", author: "Chinese proverb" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" }
];

const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const cardEl = document.getElementById("card");
const dateEl = document.getElementById("date");
const newBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy");

let currentIndex = -1;

// Deterministic daily quote: same one all day, for everyone.
function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function quoteOfTheDayIndex() {
  const now = new Date();
  return (dayOfYear(now) + now.getFullYear()) % quotes.length;
}

function render(index) {
  currentIndex = index;
  cardEl.classList.add("fading");
  setTimeout(() => {
    quoteEl.textContent = quotes[index].text;
    authorEl.textContent = "- " + quotes[index].author;
    cardEl.classList.remove("fading");
  }, 250);
}

function showRandomQuote() {
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === currentIndex);
  render(index);
}

async function copyQuote() {
  const text = `"${quotes[currentIndex].text}" - ${quotes[currentIndex].author}`;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  copyBtn.textContent = "Copied!";
  copyBtn.classList.add("copied");
  setTimeout(() => {
    copyBtn.textContent = "Copy";
    copyBtn.classList.remove("copied");
  }, 1500);
}

dateEl.textContent = new Date().toLocaleDateString("en-GB", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
});

newBtn.addEventListener("click", showRandomQuote);
copyBtn.addEventListener("click", copyQuote);
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && event.target === document.body) {
    event.preventDefault();
    showRandomQuote();
  }
});

render(quoteOfTheDayIndex());
