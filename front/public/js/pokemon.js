import api from './api.js';

const pokemon = {
  init() {
    pokemon.load();
    pokemon.handleModal()
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
    clone.handleModal();

    document.getElementById("app").append(clone);
  },

  handleModal() {
    const pkmDetail = document.getElementById("pkm_detail"); // modal
    const pkmCard = document.querySelectorAll('.card'); // all pkm card

    pkmCard.forEach((card) => {
      card.addEventListener("click", () => {
        pkmDetail.classList.add("is-active");
      });
    });

  }
};

export default pokemon;

