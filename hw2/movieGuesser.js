const movies = [
  {
    title: "Harry Potter",
    explanation: "This movie is about a dude with a stick...",
    hint: "It's Magic",
  },
  {
    title: "Just Go With It",
    explanation: "This movie is about people who go on holiday...",
    hint: "Adam, Drew and Jennifer",
  },
  {
    title: "Never Back Down",
    explanation:
      "This movie is about two guys with daddy issues who beat each other up...",
    hint: "Kanye West - Stronger",
  },
  {
    title: "Spongebob Squarepants",
    explanation: "This movie is about a rectangle...",
    hint: "It's a cartoon",
  },
  {
    title: "50 First Dates",
    explanation: "This movie is about a chick, she has the worst memory...",
    hint: "50 times...",
  },
  {
    title: "Cars",
    explanation: "In this movie, car go fast...",
    hint: "Kachow",
  },
  {
    title: "Spiderman",
    explanation:
      "In this movie this guy just does not pay his rent, no matter how many times the landlord asks...",
    hint: "Peta-Paka",
  },
  {
    title: "The Wolf Of Wall Street",
    explanation:
      "In this movie there's like illegal stuff, lots of money, and a blonde chick...",
    hint: "AWOOooooooooooo goes the...",
  },
  {
    title: "Inception",
    explanation: "In this movie everyone is like sleeping all the time...",
    hint: "Dreams...",
  },
  {
    title: "Peter Pan",
    explanation:
      "In this movie some kids die and an angel escorts them to heaven...",
    hint: "Always flying, cuz he neverlands",
  },
  {
    title: "The Lord Of The Rings",
    explanation: "In this movie some small guys go for a walk...",
    hint: "You will not vacate past this exact position",
  },
];

var movieNum = 0;
const hint = document.getElementById("hint");
const movieInput = document.getElementById("movieInput");

function reset() {
  document.getElementById("movieNum").innerHTML = `Movie #${movieNum + 1}`;

  document.getElementById(
    "explanation"
  ).innerHTML = `Explanation: ${movies[movieNum].explanation}`;

  document.getElementById("result").innerHTML = ` `;

  movieInput.value = "";
  hint.innerHTML = "Hint";
  hint.addEventListener("click", () => {
    hint.innerHTML = `Hint: ${movies[movieNum].hint}`;
  });
}

function checkGuess() {
  if (movieInput.value.toLowerCase() == movies[movieNum].title.toLowerCase()) {
    document.getElementById("result").innerHTML = "You are correct!!!";
  } else {
    document.getElementById("result").innerHTML = "Incorrect, try again!";
  }
}

reset();

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  checkGuess();
});

// document.getElementById("check").addEventListener("click", checkGuess);

// document.getElementById("check").addEventListener("click", (event) => {
//   event.preventDefault();
//   checkGuess();
// });

document.getElementById("next").addEventListener("click", () => {
  movieNum = (movieNum + 1) % 11;
  reset();
});

document.getElementById("prev").addEventListener("click", () => {
  movieNum = (movieNum - 1 + 11) % 11;
  reset();
});
