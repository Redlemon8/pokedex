import type from './type.js';
import modals from './modal.js';

const addToDom = {

  displayPokemons(pokemons) {
    
    // Display pokemons to the DOM
    const template = document.querySelector('.template-pokemon');
    const clone = template.content.cloneNode(true);
    clone.querySelector('[slot="pokemon-name"]').textContent = pokemons.name;
    clone.querySelector(".pkm_img").src = "images/" + pokemons.id + ".webp";

    const card = clone.querySelector('.card');
    card.dataset.pokemons = pokemons.id;
    document.getElementById("app").append(clone);


    card.addEventListener('click', () => modals.handleModal(pokemons.id));

  },

  displayTypes(types) {

    // Select types element into the dom
    const template = document.querySelector('.template-type');
    const clone = template.content.cloneNode(true);
    const buttons = clone.querySelector('.button');
    buttons.style = "background-color: #" + types.color +";";
    buttons.textContent = types.name;
    
    // Dispaly types to the dom
    document.getElementById("app").append(clone);
    
    // EventListener on click type button
    buttons.addEventListener('click', () => type.displayPokemonByType(types.id));
    
  },

  displayTeams(teams) {
    const template = document.querySelector('.template-team');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.team-name').textContent = teams.name;
    clone.querySelector('.team-description').textContent = teams.description;

    const imgContainer = clone.querySelector('.imgContainer');
    imgContainer.innerHTML = '';

    // Create figure element
    const figure = document.createElement('figure');
    figure.classList.add('image', 'is-flex', 'is-justify-content-center');

    // Loop to create each pokemon img  
    teams.pokemons.forEach(pokemon => {
      const img = document.createElement('img');
      img.classList.add('pokemon-team-image', 'is-rounded', 'mx-2', 'is-16x16');
      // get the properly img by id
      img.src = "./images/" + pokemon.id + ".webp";
      // open modal to each pokemon by img click
      img.addEventListener('click', () => modals.handleModal(pokemon.id));
      // Add img to each team figure
      figure.append(img);
    });

    // display each figure to the img container
    imgContainer.append(figure);

    const btnModalTeam = clone.querySelector('.btnModalTeam');
    btnModalTeam.dataset.teams = teams.id;

    document.getElementById("app").append(clone);


    btnModalTeam.addEventListener('click', () => modals.handleTeamModal(teams.id));
  },
}

export default addToDom;