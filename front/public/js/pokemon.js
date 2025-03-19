import addToDom from './addToDom.js';
import api from './api.js';

const pokemon = {
  init() {
    pokemon.load();
    pokemon.bind();
  },

  bind() {
    document.getElementById("nav-item-home").addEventListener("click", () => this.load());
  },

  async load() {
    document.getElementById('app').innerHTML = '';
    // Get pokemons data from api.js 
    const pokemons = await api.getPokemons();

    if (pokemons === null) {
        alert("Impossible de charger les pokemons !");
        return;
    }

    // Send pokemon data to the next function
    pokemons.forEach(loadPokemon => addToDom.displayPokemons(loadPokemon));

  },
};

export default pokemon;

