import api from './api.js';

const type = {

  init() {
    console.log('init type');
    type.bind();
  },

  bind() {
    console.log('bind');
    document.querySelector('a#nav-item-type').addEventListener('click', () => this.loadType());
  },

  async loadType() {
    console.log('lodType function');
    const types = await api.getTypes();

    if (types === null) {
        alert("Impossible de charger les types !");
        return;
    }
    document.querySelector('.template-pokemon').remove(); 

    types.forEach(loadType => type.addToDOM(loadType));
  },

  addToDOM(type) {
    const template = document.querySelector('.template-type');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.button').style = "background-color: #" + type.color +";";
    clone.querySelector('.button').textContent = type.name;

    //remove pokemons
    const pokemons = document.querySelectorAll('[slot="pokemon-id"]');
    pokemons.forEach(pokemon => {
      pokemon.style.display = 'none';
    });
    
    document.getElementById("app").append(clone);
  },
}
export default type;