import api from './api.js';

const pokemon = {
  init() {
    pokemon.load();
  },

  async load() {

    const pokemons = await api.getPokemons();
    console.log(pokemons);

    if (pokemons === null) {
        alert("Impossible de charger les pokemons !");
        return;
    }

    pokemons.forEach(loadPokemon => pokemon.addToDOM(loadPokemon));
  },

  addToDOM(pokemon) {
      
    const template = document.querySelector('.template-pokemon');
    const clone = template.content.cloneNode(true);
    clone.querySelector('[slot="pokemon-name"]').textContent = pokemon.name;
    clone.querySelector(".pkm_img").src = "images/" + pokemon.id + ".webp";
    clone.querySelector('.card').addEventListener('click', () => this.handleModal());

    document.getElementById("app").append(clone);
  },

  handleModal() {
    const pkmDetail = document.getElementById("pkm_detail"); // modal
    pkmDetail.classList.add("is-active");

    const close = document.querySelectorAll(".close");
    close.forEach(modal => {
      modal.addEventListener('click', () => pkmDetail.classList.remove("is-active"));
    });
  }
};

export default pokemon;

