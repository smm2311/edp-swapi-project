let characters = [];
let matchingCharacters = [];
const charactersList = document.querySelector("#charactersList")

document.addEventListener('DOMContentLoaded', getCharacters)

let films = [];
let matchingFilms = [];
const filmsList = document.querySelector("#filmsList")

// Is this necessary?
document.addEventListener('DOMContentLoaded', getFilms)

let planets = [];
let matchingPlanets = [];
const planetsList = document.querySelector("#planetsList")

// Is this necessary?
document.addEventListener('DOMContentLoaded', getPlanets)

async function getCharacters() {
  let url = 'http://localhost:9001/api/characters';

  try {
    const fetchedCharacters = await fetch(url)
      .then(res => res.json())
    characters.push(...fetchedCharacters);
  }
  catch (ex) {
    console.error("Error reading characters.", ex.message);
  }
  console.log("All the characters are ", characters)
  renderCharacters(characters);
}

const filterCharacters = () => {
  const characterSearchString = document.querySelector("#characterSearchString").value;
  const re = new RegExp(characterSearchString, "i");
  matchingCharacters = characters.filter(character => re.test(character.name))
  renderCharacters(matchingCharacters);
}

const renderCharacters = characters => {
  const divs = characters.map(character => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToCharacterPage(character.id));
    el.textContent = character.name;
    return el;
  })
  charactersList.replaceChildren(...divs)
}

const goToCharacterPage = id => window.location = `/character.html?id=${id}`

async function getFilms() {
  let url = 'http://localhost:9001/api/films';

  try {
    const fetchedFilms = await fetch(url)
      .then(res => res.json())
    films.push(...fetchedFilms);
  }
  catch (ex) {
    console.error("Error reading films.", ex.message);
  }
  console.log("All the films are ", films)
  renderFilms(films);
}

const filterFilms = () => {
  const filmSearchString = document.querySelector("#filmSearchString").value;
  const re = new RegExp(filmSearchString, "i");
  matchingFilms = films.filter(film => re.test(film.title))
  renderFilms(matchingFilms);
}

const renderFilms = films => {
  const divs = films.map(film => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToFilmPage(film.id));
    el.textContent = film.title;
    return el;
  })
  filmsList.replaceChildren(...divs)
}

const goToFilmPage = id => window.location = `/film.html?id=${id}`

async function getPlanets() {
  let url = 'http://localhost:9001/api/planets';

  try {
    const fetchedPlanets = await fetch(url)
      .then(res => res.json())
      planets.push(...fetchedPlanets);
  }
  catch (ex) {
    console.error("Error reading planets.", ex.message);
  }
  console.log("All the planets are ", planets)
  renderPlanets(planets);
}

const filterPlanets = () => {
  const planetSearchString = document.querySelector("#planetsSearchString").value;
  const re = new RegExp(planetSearchString, "i");
  matchingPlanets = planets.filter(planet => re.test(planet.name))
  renderPlanets(matchingPlanets);
}

const renderPlanets = planets => {
  const divs = planets.map(planet => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToPlanetPage(planet.id));
    el.textContent = planet.name;
    return el;
  })
  planetsList.replaceChildren(...divs)
}

const goToPlanetPage = id => window.location = `/planet.html?id=${id}`