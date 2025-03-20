import addToDom from './addToDom.js';
import api from './api.js';

const team = {
  init() {
    team.bind();
  },

  bind() {
    document.getElementById("nav-item-team").addEventListener("click", () => this.load());
  },

  async load() {
    document.getElementById('app').innerHTML = '';
    // Get pokemons data from api.js 
    const teams = await api.getTeams();
    
    if (teams === null) {
        alert("Impossible de charger les équipes !");
        return;
    }

    // Send pokemon data to the next function
    teams.forEach(loadTeam => addToDom.displayTeams(loadTeam));

  },
};

export default team;