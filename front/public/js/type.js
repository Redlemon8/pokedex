import addToDom from './addToDom.js';
import api from './api.js';

const type = {

  init() {
    type.bind();
  },

  bind() {
    document.querySelector('a#nav-item-type').addEventListener('click', () => this.loadType());
  },

  async loadType() {
    document.getElementById('app').innerHTML = '';
    
    // Appliquer le background spécifique pour la page des types
    const appBackground = document.querySelector('.app-background');
    if (appBackground) {
      appBackground.classList.add('types-page-background');
      appBackground.classList.remove('teams-page-background', 'home-page-background');
    }
    
    // Get data types from api.js
    const types = await api.getTypes();
    
    if (types === null) {
      alert("Impossible de charger les types !");
      return;
    }
    
    // Loop to display types button, jump on addToDom.js
    types.forEach(loadType => addToDom.displayTypes(loadType));
  },
  
  async displayPokemonByType(typeId) { 
    
    // Remove only the Pokémon cards, but keep the type buttons
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    pokemonCards.forEach(card => {
      card.remove();
    });

    // Get data types by id from api 
    const pokemonsByType = await api.getOneType(typeId);
    const pokemons = pokemonsByType.pokemons;

    // Loop to display pokemons after type selection, jump on addToDom.js
    pokemons.forEach(pokemon => addToDom.displayPokemons(pokemon));

  },

}
export default type;