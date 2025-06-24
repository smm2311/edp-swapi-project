let titleH1;
let episodeSpan;
let releaseDateSpan;
let directorSpan;
let producerSpan;

let crawlP;

let charactersUl;
let planetsUl;
let starshipsUl;

const baseURL = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
    titleH1 = document.querySelector('h1#title');
    episodeSpan = document.querySelector('span#episode');
    releaseDateSpan = document.querySelector('span#release');
    directorSpan = document.querySelector('span#director');
    producerSpan = document.querySelector('span#producer');

    crawlP = document.querySelector('#openingCrawl>p');

    charactersUl = document.querySelector('#characters>ul');
    planetsUl = document.querySelector('#planets>ul');
    starshipsUl = document.querySelector('#starships>ul');

    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');

    getFilm(id);
});

async function getFilm(id) {
    let film;

    try {
        film = await fetchData(`${baseURL}/films/${id}`);
        film.characters = await fetchData(`${baseURL}/films/${id}/characters`);
        film.planets = await fetchData(`${baseURL}/films/${id}/planets`);
        film.starships = await fetchData(`${baseURL}/films/${id}/starships`);
    } catch (err) {
        console.error(`Error reading film ${id} data.`, err.message);
    }

    renderFilm(film);
}

async function fetchData(url) {
    return await fetch(url)
        .then(res => res.json());
}

function renderFilm(film) {

    console.log(film);

    document.title = `SWAPI - ${film?.title}`;

    titleH1.textContent = film?.title;
    episodeSpan.textContent = film?.episode_id;
    releaseDateSpan.textContent = film?.release_date;
    directorSpan.textContent = film?.director;
    producerSpan.textContent = film?.producer;

    crawlP.textContent = film?.opening_crawl;

    const characters = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`);
    const planets = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`);
    const starships = film?.starships?.map(starship => `<li><a href="/starships.html?id=${starship.id}">${starship.name}</li>`);
    
    charactersUl.innerHTML = characters.join("");
    planetsUl.innerHTML = planets.join("");
    starshipsUl.innerHTML = starships.join("");
}