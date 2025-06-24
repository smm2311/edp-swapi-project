let nameH1;
let diameter;
let rotationalaPeriod;
let gravity;
let population;
let peopUl;
let filmsUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    diameterSpan = document.querySelector('span#diameter');
    rotationalaPeriodSpan = document.querySelector('span#rotationalperiod');
    orbitalPeriodSpan = document.querySelector('span#orbitalperiod');
    gravitySpan = document.querySelector('span#gravity');
    populationSpan = document.querySelector('span#population');
    peopUl = document.querySelector('#people>ul')
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlantet(id)
  });

async function getPlantet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.residents = await fetchResidents(planet)
      planet.films = await fetchFilms(planet);
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  
  }

async function fetchFilms(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }

async function fetchResidents(planet) {
    let planetUrl = `${baseUrl}/planets/${planet?.id}/characters`;
    return await fetch(planetUrl)
      .then(res => res.json())
  }

async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`;
    return await fetch(planetUrl)
      .then(res => res.json())
  }


  const renderPlanet = planet => {
    console.log(planet);
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    diameterSpan.textContent = planet?.diameter;
    rotationalaPeriodSpan.textContent = planet?.rotation_period;
    orbitalPeriodSpan.textContent = planet?.orbital_period;
    gravitySpan.textContent = planet?.gravity;
    populationSpan.textContent = planet?.population;

    const peopleLis = planet?.residents?.map(residents => `<li><a href="/character.html?id=${residents.id}">${residents.name}</li>`)
    peopUl.innerHTML = peopleLis.join("");

    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
    
  }