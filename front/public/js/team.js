import addToDom from './addToDom.js';
import api from './api.js';
import modals from './modal.js';

const team = {
  init() {
    team.bind();
  },

  bind() {
    document.getElementById("nav-item-team").addEventListener("click", () => this.load());
    // document.getElementById("nav-item-add-team").addEventListener("click", () => this.creatTeam());
    document.getElementById("open_add_team_modal").addEventListener("click", (event) => modals.creatTeamModal());
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

  async creatTeam(data) {

    // const form = document.getElementById("form_team_modal")
    // document.getElementById('app').innerHTML = '';

    console.log('je suis dans .team.creatTeam');

        data = Object.fromEntries(new FormData(form));

        console.log(data);

        const createTeam = await api.createTeam(data);

        if (createdList === null) {
            alert("Impossible de créer la liste !");
            return;
        }

        createTeam.addToDom.displayTeams(team);

        form.reset();

  }
};

export default team;