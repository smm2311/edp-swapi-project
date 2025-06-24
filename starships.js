let starshipClassSpan;
let MGLTSpan;
let hyperdriveRatingSpan;
let pilotsUl;
let filmsUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', async () => {
  starshipClassSpan = document.querySelector('span#starship_class');
  MGLTSpan = document.querySelector('span#MGLT');
  hyperdriveRatingSpan = document.querySelector('span#hyperdrive_rating');
  pilotsUl = document.querySelector('#pilots>ul');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');
  if (id) {
    const starship = await getStarship(id);
    if (starship) {
      renderStarship(starship);
    }
  }
});

async function getStarship(id) {
  let starship;
  try {
    starship = await fetchStarship(id);
    starship.pilots = await fetchPilots(starship);
    starship.films = await fetchFilms(starship);
  } catch (ex) {
  }
  return starship; 
}

async function fetchStarship(id) {
  const starshipUrl = `${baseUrl}/starships/${id}`;
  try {
    const response = await fetch(starshipUrl);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
  }
  return null;
}


async function fetchPilots(starship) {
    const url = `${baseUrl}/starships/${starship?.id}/characters`;
    const pilots = await fetch(url).then(res => res.json());
    return pilots;
  }

async function fetchFilms(starship) {
    const url = `${baseUrl}/starships/${starship?.id}/films`;
    const films = await fetch(url).then(res => res.json());
    return films;
  }

const renderStarship = starship => {
  document.title = `SWAPI - ${starship?.starship_class}`; 
  starshipClassSpan.textContent = starship?.starship_class || 'N/A';
  MGLTSpan.textContent = starship?.MGLT || 'N/A';
  hyperdriveRatingSpan.textContent = starship?.hyperdrive_rating || 'N/A';
  
  const pilotsLis = starship?.pilots?.map(pilot => `<li><a href="/character.html?id=${pilot.id}">${pilot.name}</a></li>`);
  pilotsUl.innerHTML = pilotsLis.join("");

  const filmsLis = starship?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</a></li>`);
  filmsUl.innerHTML = filmsLis.join("");
}
