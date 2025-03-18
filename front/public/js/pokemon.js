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

        document.getElementById("app").append(clone);
    },
};

export default pokemon;

