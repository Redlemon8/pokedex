import addToDom from './addToDom.js';
import api from './api.js';
import modals from './modal.js';

const team = {
  init() {
    team.bind();
  },

  bind() {
    document.getElementById("nav-item-team").addEventListener("click", () => this.load());
    document.getElementById("nav-item-add-team").addEventListener("click", (event) => modals.creatTeamModal());
  },

  async load() {
    document.getElementById('app').innerHTML = '';
    
    // Appliquer le background spécifique pour la page des équipes
    const appBackground = document.querySelector('.app-background');
    if (appBackground) {
      appBackground.classList.add('teams-page-background');
      appBackground.classList.remove('home-page-background', 'types-page-background');
    }
    
    // Get pokemons data from api.js 
    const teams = await api.getTeams();

    if (teams === null) {
        alert("Impossible de charger les équipes !");
        return;
    }

    // Send pokemon data to the next function
    for (const team of teams) {
      await addToDom.displayTeams(team);
    }

  },

  async creatTeam(data) {
        console.log("Données reçu par la modal : ", data);

        const createTeam = await api.createTeam(data);

        if (createTeam === null) {
            alert("Impossible de créer l'équipe !");
            return;
        }
        console.log("Réponse de l'API :", createTeam);

        await addToDom.displayTeams(createTeam);
        const form = document.getElementById('form_team_modal')
        form.reset();
        document.getElementById('add_team_modal').remove();
  },

  async editTeam(teamId, data) {
    console.log("Données reçues pour modification : ", data);

    const editTeam = await api.editTeam(teamId, data);

    if (editTeam === null) {
        alert("Impossible de modifier l'équipe !");
        return false;
    }
    console.log("Réponse de l'API :", editTeam);

    return true;
  }
};

export default team;