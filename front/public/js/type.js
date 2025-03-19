import api from './api.js';

const type = {

  init() {
    type.bind();
  },

  bind() {
    document.querySelector('a#nav-item-type').addEventListener('click', () => this.loadType());
  },

  async loadType() {

    // Bring data types from api.js
    const types = await api.getTypes();
    
    if (types === null) {
      alert("Impossible de charger les types !");
      return;
    }
    //remove pokemons
    const pokemons = document.querySelectorAll('.pokemon-card-type');
    pokemons.forEach(pokemon => {
      pokemon.style.display = 'none';
    }); 

    
    types.forEach(loadType => type.addToDOM(loadType));
  },
  
  // 
  addToDOM(type) {
    
    // Select types element into the dom
    const template = document.querySelector('.template-type');
    const clone = template.content.cloneNode(true);
    const buttons = clone.querySelector('.button');
    buttons.style = "background-color: #" + type.color +";";
    buttons.textContent = type.name;

    //remove pokemons
    const pokemons = document.querySelectorAll('[slot="pokemon-id"]');
    pokemons.forEach(pokemon => {
      pokemon.style.display = 'none';
    });
    
    // Dispaly types to the dom
    document.getElementById("app").append(clone);

    // EventListener on click type 
    buttons.addEventListener('click', () => this.displayPokemonByType(type.id));
    
  },

  async displayPokemonByType(typeId) {
    
    const buttons = document.querySelectorAll('.block-type');
    buttons.forEach(button => {
      button.remove();
    });

    const pokemonsByType = await api.getOneType(typeId);
    const pokemons = pokemonsByType.pokemons;

    pokemons.forEach(pokemon => type.addPokemonsToDOM(pokemon));


  },

  addPokemonsToDOM(pokemonId) {
    console.log(pokemonId);
    const template = document.querySelector('.pokemon-by-type');
    const clone = template.content.cloneNode(true);
    clone.querySelector('[slot="pokemon-name"]').textContent = pokemonId.name;
    clone.querySelector(".pkm_img").src = "images/" + pokemonId.id + ".webp";
    

      document.getElementById("app").append(clone);

  }
}
export default type;