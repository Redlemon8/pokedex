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


  handleModal(pokemonId) {
    const pkmDetail = document.getElementById("pkm_detail");
    pkmDetail.classList.add("is-active");
    pokemon.displayPokemonDetails(pokemonId);

    const close = document.querySelectorAll(".close");
    close.forEach(modal => {
      modal.addEventListener('click', () => pkmDetail.classList.remove("is-active"));
    });
  },

  async displayPokemonDetails(pokemonId) {

    const pokemon = await api.getOnePokemon(pokemonId);

    if (!pokemon) {
      alert("Impossible de charger le pokemon !");
      return;
    }
    document.querySelector('.pkm_name').textContent = pokemon.name;
    document.querySelector('.pkm_img_modal').src = "images/" + pokemon.id + ".webp";
    document.querySelector('.pokemon-hp').textContent = pokemon.hp;
    document.querySelector('.pokemon-atk').textContent = pokemon.atk;
    document.querySelector('.pokemon-def').textContent = pokemon.def;
    document.querySelector('.pokemon-atk_spe').textContent = pokemon.atk_spe;
    document.querySelector('.pokemon-def_spe').textContent = pokemon.def_spe;
    document.querySelector('.pokemon-speed').textContent = pokemon.speed;
    document.querySelector('progress.hp').value = `${pokemon.hp}`;
    document.querySelector('progress.atk').value = `${pokemon.atk}`;
    document.querySelector('progress.def').value = `${pokemon.def}`;
    document.querySelector('progress.atk_spe').value = `${pokemon.atk_spe}`;
    document.querySelector('progress.def_spe').value = `${pokemon.def_spe}`;
    document.querySelector('progress.speed').value = `${pokemon.speed}`;
  }
};

export default pokemon;

