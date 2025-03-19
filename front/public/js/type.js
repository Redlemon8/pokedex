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
    
    // Remove types buttons 
    const buttons = document.querySelectorAll('.block-type');
    buttons.forEach(button => {
      button.remove();
    });

    // Get data types by id from api 
    const pokemonsByType = await api.getOneType(typeId);
    const pokemons = pokemonsByType.pokemons;

    // Loop to display pokemons after type selection, jump on addToDom.js
    pokemons.forEach(pokemon => addToDom.displaypokemonsByType(pokemon));

  },

}
export default type;