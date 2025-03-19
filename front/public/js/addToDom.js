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

  displaypokemonsByType(pokemonId) {

    // Display pokemons by type
    const template = document.querySelector('.pokemon-by-type');
    const clone = template.content.cloneNode(true);
    clone.querySelector('[slot="pokemon-name"]').textContent = pokemonId.name;
    clone.querySelector(".pkm_img").src = "images/" + pokemonId.id + ".webp";
    
    const card = clone.querySelector('.card');
    card.dataset.pokemonId = pokemonId.id;
      document.getElementById("app").append(clone);
      card.addEventListener('click', () => modals.handleModal(pokemonId.id));
  },
}

export default addToDom;