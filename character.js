let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsUl;
let homeworldSpan;
let starshipsUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', async () => {
  nameH1 = document.querySelector('h1#name');
  birthYearSpan = document.querySelector('span#birth_year');
  massSpan = document.querySelector('span#mass');
  heightSpan = document.querySelector('span#height');
  homeworldSpan = document.querySelector('span#homeworld');
  filmsUl = document.querySelector('#films>ul');
  starshipsUl = document.querySelector('#starships>ul');
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');
  const character = await getCharacter(id);
  character.starships = await fetchStarships(character);
  renderCharacter(character);
});

async function getCharacter(id) {
  let character;
  try {
    character = await fetchCharacter(id);
    character.homeworld = await fetchHomeworld(character);
    character.films = await fetchFilms(character);
  } catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  return character; 
}

async function fetchCharacter(id) {
  const characterUrl = `${baseUrl}/characters/${id}`;
  return await fetch(characterUrl).then(res => res.json());
}

async function fetchHomeworld(character) {
  const url = `${baseUrl}/planets/${character?.homeworld}`;
  const planet = await fetch(url).then(res => res.json());
  return planet;
}

async function fetchFilms(character) {
  const url = `${baseUrl}/characters/${character?.id}/films`;
  const films = await fetch(url).then(res => res.json());
  return films;
}

async function fetchStarships(character) {
  const url = `${baseUrl}/characters/${character?.id}/starships`;
  const starships = await fetch(url).then(res => res.json());
  return starships;
}

const renderCharacter = character => {
  document.title = `SWAPI - ${character?.name}`; 
  nameH1.textContent = character?.name;
  heightSpan.textContent = character?.height;
  massSpan.textContent = character?.mass;
  birthYearSpan.textContent = character?.birth_year;
  homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  
  const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</a></li>`);
  filmsUl.innerHTML = filmsLis.join("");

  const starshipsLis = character?.starships?.map(starship => `<li><a href="/starships.html?id=${starship.id}">${starship.starship_class}</a></li>`);
  starshipsUl.innerHTML = starshipsLis.join("");
}
