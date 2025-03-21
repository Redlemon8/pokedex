import api from './api.js';
import team from './team.js';

const modals = {
  handleModal(pokemonId) {
    const pkmDetail = document.getElementById("pkm_detail");
    pkmDetail.classList.add("is-active");
    modals.displayPokemonDetails(pokemonId);

    const close = document.querySelectorAll(".close");
    close.forEach(modal => {
      modal.addEventListener('click', () => pkmDetail.classList.remove("is-active"));
    });
  },

  async displayPokemonDetails(pokemonId) {

    const pokemon = await api.getOnePokemon(pokemonId);
    console.log(pokemon);

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
  },

  handleTeamModal(teamId) {
    const teamModal = document.getElementById("team_modal");
    teamModal.classList.add("is-active");
    modals.displayTeamModal(teamId);

    const close = document.querySelectorAll(".close");
    close.forEach(modal => {
      modal.addEventListener('click', () => teamModal.classList.remove("is-active"));
    });
  },

  async displayTeamModal(teamId) {
    console.log("displayTeamModal");

    const team = await api.getOneTeam(teamId);
    if (!team) {
      alert("Impossible de charger l'équipe !");
      return;
    }
  
    document.querySelector('.team_name').textContent = team.name;
    document.querySelector('.team_description').textContent = team.description;
    

    const tbody = document.getElementById("tbody_team");
    tbody.innerHTML = ""; // Clear existing rows

    // Loop to creat Modal information about pokemons team
    team.pokemons.forEach(pokemon => {
      const tr = document.createElement("tr");

      const tdNumero = document.createElement("td");
      tdNumero.textContent = pokemon.id;
      tr.appendChild(tdNumero);

      const tdName = document.createElement("td");
      tdName.textContent = pokemon.name;
      tr.appendChild(tdName);

      const tdHp = document.createElement("td");
      tdHp.textContent = pokemon.hp;
      tr.appendChild(tdHp);

      const tdAtk = document.createElement("td");
      tdAtk.textContent = pokemon.atk;
      tr.appendChild(tdAtk);

      const tdDef = document.createElement("td");
      tdDef.textContent = pokemon.def;
      tr.appendChild(tdDef);

      const tdAtkSpe = document.createElement("td");
      tdAtkSpe.textContent = pokemon.atk_spe;
      tr.appendChild(tdAtkSpe);

      const tdDefSpe = document.createElement("td");
      tdDefSpe.textContent = pokemon.def_spe;
      tr.appendChild(tdDefSpe);

      const tdSpeed = document.createElement("td");
      tdSpeed.textContent = pokemon.speed;
      tr.appendChild(tdSpeed);

      const tdTypes = document.createElement("td");
      tdTypes.textContent = pokemon.types.map(type => type.name).join(", "); // Display types as a comma-separated string
      tr.appendChild(tdTypes);

      const tdOptions = document.createElement("td");
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa", "fa-trash");
      tdOptions.appendChild(deleteIcon);
      tr.appendChild(tdOptions);

      tbody.appendChild(tr);
    });

  },

  creatTeamModal() {

    const addTeam = document.getElementById("add_team_modal");
    addTeam.classList.add("is-active");

    const close = document.querySelectorAll(".close");
    close.forEach(modal => {
      modal.addEventListener('click', () => addTeam.classList.remove("is-active"));
    });

    const form = document.getElementById('form_team_modal');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      team.creatTeam(data);
    });

  }
};

export default modals;