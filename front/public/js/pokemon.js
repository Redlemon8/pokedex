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
    
    // Appliquer le background spécifique pour la page d'accueil
    const appBackground = document.querySelector('.app-background');
    if (appBackground) {
      appBackground.classList.add('home-page-background');
      appBackground.classList.remove('teams-page-background', 'types-page-background');
    }
    
    // Get pokemons data from api.js 
    const pokemons = await api.getPokemons();

    if (pokemons === null) {
        alert("Impossible de charger les pokemons !");
        return;
    }

    // Send pokemon data to the next function
    pokemons.forEach(loadPokemon => addToDom.displayPokemons(loadPokemon));

  },

  async addPokemonToTeam(data) {
    console.log("données reçu par la modal : ",  data);

    try {
      const response = await api.addPokemonToTeam(data.teamId, data.pokemonId);

      if (response) {
        console.log("Pokémon ajouté avec succées via l'API !");
        return true;
      } else {
        console.error("Echec de l'ajout du Pokémon à l'équipe via l'API.");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du Pokémon à l'équipe :", error);
      return false;
      
    }
  },

  async removePokemonFromTeam(data) {
    console.log("données reçu par la modal : ",  data);

    try {
      const response = await api.removePokemonFromTeam(data.teamId, data.pokemonId);

      if (response) {
        console.log("Pokémon supprimé avec succées via l'API !");
        return true;
      } else {
        console.error("Echec de la suppression du Pokémon de l'équipe via l'API.");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du Pokémon de l'équipe :", error);
      return false;
    }
  }
};

export default pokemon;

