let characters = [];
let matchingCharacters = [];
const charactersList = document.querySelector("#charactersList");

document.addEventListener('DOMContentLoaded', getCharacters);

let films = [];
let matchingFilms = [];
const filmsList = document.querySelector("#filmsList");

document.addEventListener('DOMContentLoaded', getFilms);

let starships = [];
let matchingStarships = [];
const starshipsList = document.querySelector("#starshipsList");

document.addEventListener('DOMContentLoaded', getStarships);

async function getCharacters() {
  let url = 'http://localhost:9001/api/characters';

  try {
    const fetchedCharacters = await fetch(url)
      .then(res => res.json());
    characters.push(...fetchedCharacters);
  } catch (ex) {
    console.error("Error reading characters.", ex.message);
  }
  console.log("All the characters are ", characters);
  renderCharacters(characters);
}

const filterCharacters = () => {
  const characterSearchString = document.querySelector("#characterSearchString").value;
  const re = new RegExp(characterSearchString, "i");
  matchingCharacters = characters.filter(character => re.test(character.name));
  renderCharacters(matchingCharacters);
}

const renderCharacters = characters => {
  const divs = characters.map(character => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToCharacterPage(character.id));
    el.textContent = character.name;
    return el;
  });
  charactersList.replaceChildren(...divs);
}

const goToCharacterPage = id => window.location = `/character.html?id=${id}`;

async function getFilms() {
  let url = 'http://localhost:9001/api/films';

  try {
    const fetchedFilms = await fetch(url)
      .then(res => res.json());
    films.push(...fetchedFilms);
  } catch (ex) {
    console.error("Error reading films.", ex.message);
  }
  console.log("All the films are ", films);
  renderFilms(films);
}

const filterFilms = () => {
  const filmSearchString = document.querySelector("#filmSearchString").value;
  const re = new RegExp(filmSearchString, "i");
  matchingFilms = films.filter(film => re.test(film.title));
  renderFilms(matchingFilms);
}

const renderFilms = films => {
  const divs = films.map(film => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToFilmPage(film.id));
    el.textContent = film.title;
    return el;
  });
  filmsList.replaceChildren(...divs);
}

const goToFilmPage = id => window.location = `/film.html?id=${id}`;


async function getStarships() {
  let url = 'http://localhost:9001/api/starships';

  try {
    const fetchedStarships = await fetch(url)
      .then(res => res.json());
    starships.push(...fetchedStarships);
  } catch (ex) {
    console.error("Error reading starships.", ex.message);
  }
  console.log("All the starships are ", starships);
  renderStarships(starships);
}

const filterStarships = () => {
  const starshipSearchString = document.querySelector("#starshipSearchString").value;
  const re = new RegExp(starshipSearchString, "i");
  matchingStarships = starships.filter(starship => re.test(starship.starship_class));
  renderStarships(matchingStarships);
}

const renderStarships = starships => {
  const divs = starships.map(starship => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToStarshipPage(starship.id));
    el.textContent = starship.starship_class; 
    return el;
  });
  starshipsList.replaceChildren(...divs);
}

const goToStarshipPage = id => window.location = `/starships.html?id=${id}`;
