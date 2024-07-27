const APIKEY = `api_key=789ecf8082011b15f21787dac77dc8ee`;
const baseURL = `https://api.themoviedb.org/3`;
const imageURL = `https://image.tmdb.org/t/p/w500`;

const requests = {
  fetchPopular: `${baseURL}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${APIKEY}`,
  fetchTrending: `${baseURL}/trending/all/week?${APIKEY}&language=en-US`,
  fetchActionMovies: `${baseURL}/discover/movie?${APIKEY}&with_genres=28`,
  fetchComedyMovies: `${baseURL}/discover/movie?${APIKEY}&with_genres=35`,
  fetchHorrorMovies: `${baseURL}/discover/movie?${APIKEY}&with_genres=27`,
  fetchRomanceMovies: `${baseURL}/discover/movie?${APIKEY}&with_genres=10749`,
  fetchDocumentaries: `${baseURL}/discover/movie?${APIKEY}&with_genres=99`,
};

const categories = [
  "populer",
  "trending",
  "action",
  "comedy",
  "horror",
  "romance",
  "documentries",
];

async function fetchCheck(url, className) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    appendCards(data, className);
  } catch (error) {
    alert("Failed to load images");
  }
}

function appendCards(data, className) {
  data.results.forEach((obj) => {
    if (obj.title === undefined) {
      return;
    }

    const newCard = document.createElement("div");
    const newCardImage = document.createElement("img");
    const newCardImageTitle = document.createElement("p");

    newCardImage.src = `${imageURL}/${obj.poster_path}`;
    newCardImageTitle.innerHTML = `${obj.title}`;
    newCardImage.className = "cardimage";

    newCard.appendChild(newCardImage);
    newCard.appendChild(newCardImageTitle);
    newCard.className = "card";
    newCardImageTitle.className = "card_image_title";

    document.querySelector(`.${className}`).appendChild(newCard);
  });
}

function apiHandler() {
  let i = 0;

  for (const key in requests) {
    fetchCheck(requests[key], categories[i]);
    i++;
  }
}

apiHandler();
