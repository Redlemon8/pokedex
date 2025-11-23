// modals.js
import api from './api.js';
import team from './team.js';
import pokemon from './pokemon.js';

// Fonction pour éclaircir une couleur hexadécimale
function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

const modals = {
  currentPokemonId: null,
  currentTeamId: null,

  handleModal(pokemonId) {
    this.currentPokemonId = pokemonId;
    const pkmDetail = document.getElementById("pkm_detail");
    pkmDetail.classList.add("is-active");
    modals.displayPokemonDetails(pokemonId);
    modals.addPokemonToTeamModal();

    // Fermer en cliquant sur le bouton close
    const closeButtons = pkmDetail.querySelectorAll(".close");
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        pkmDetail.classList.remove("is-active");
        this.currentPokemonId = null;
      });
    });

    // Fermer en cliquant sur le background
    const modalBackground = pkmDetail.querySelector(".modal-background");
    modalBackground.addEventListener('click', () => {
      pkmDetail.classList.remove("is-active");
      this.currentPokemonId = null;
    });
  },

  async displayPokemonDetails(pokemonId) {
   
    const pokemonDetails = await api.getOnePokemon(pokemonId);

    if (!pokemonDetails) {
      alert("Impossible de charger le pokemon !");
      return;
    }
    document.querySelector('.pkm_name').textContent = pokemonDetails.name;
    document.querySelector('.pkm_img_modal').src = "/images/" + pokemonDetails.id + ".webp";
    document.querySelector('.pokemon-hp').textContent = pokemonDetails.hp;
    document.querySelector('.pokemon-atk').textContent = pokemonDetails.atk;
    document.querySelector('.pokemon-def').textContent = pokemonDetails.def;
    document.querySelector('.pokemon-atk_spe').textContent = pokemonDetails.atk_spe;
    document.querySelector('.pokemon-def_spe').textContent = pokemonDetails.def_spe;
    document.querySelector('.pokemon-speed').textContent = pokemonDetails.speed;
    document.querySelector('progress.hp').value = `${pokemonDetails.hp}`;
    document.querySelector('progress.atk').value = `${pokemonDetails.atk}`;
    document.querySelector('progress.def').value = `${pokemonDetails.def}`;
    document.querySelector('progress.atk_spe').value = `${pokemonDetails.atk_spe}`;
    document.querySelector('progress.def_spe').value = `${pokemonDetails.def_spe}`;
    document.querySelector('progress.speed').value = `${pokemonDetails.speed}`;

    const form = document.querySelector('#form_add_pkm_team');
    const teams = await api.getTeams();

    // Cible directement le select
    const select = form.querySelector('select');
    select.innerHTML = "";
    
    // Ajouter une option par défaut
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Sélectionnez une équipe";
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.append(defaultOption);
    
    // Renommé pour éviter le conflit avec l'import `team`
    for (const teamOption of teams) {
      const option = document.createElement('option');
      option.textContent = teamOption.name;
      option.value = teamOption.id;
      
      // Vérifier si l'équipe est pleine
      if (teamOption.pokemons && teamOption.pokemons.length >= 6) {
        option.textContent += " (Équipe complète)";
        option.disabled = true;
      }
      
      select.append(option);
    }
  },

  // Fonction de gestionnaire d'événement pour l'ajout de Pokémon
  addPokemonSubmitHandler: async function(event) {
    event.preventDefault();
    const form = event.currentTarget; // Le formulaire qui a déclenché l'événement
    const formData = new FormData(form);

    // Récupére la valeur du select
    const selectedteamId = form.querySelector('select').value;
    
    // Vérifier qu'une équipe a été sélectionnée
    if (!selectedteamId) {
      alert("Veuillez sélectionner une équipe !");
      return;
    }
    
    // Vérifier le nombre de Pokémon dans l'équipe sélectionnée
    const selectedTeam = await api.getOneTeam(selectedteamId);
    if (selectedTeam && selectedTeam.pokemons && selectedTeam.pokemons.length >= 6) {
      alert("Cette équipe est déjà complète (6 Pokémon maximum) !");
      return;
    }
    
    // Ajoute l'ID du Pokémon aux données du formulaire
    formData.append('pokemonId', modals.currentPokemonId); // Utilise modals.currentPokemonId

    const data = Object.fromEntries(formData);
    console.log("Données envoyées à addPokemonToTeam : ", data);

    const success = await pokemon.addPokemonToTeam(data);
    if (success) {
      alert("Pokémon ajouté à l'équipe avec succès !");
      document.getElementById("pkm_detail").classList.remove("is-active");
      modals.currentPokemonId = null; // Réinitialise
    } else {
      alert("Erreur lors de l'ajout du Pokémon à l'équipe.");
    }
  },

  async addPokemonToTeamModal() {
    console.log('Je suis la fonction addPokemonToTeamModal');
    const form = document.querySelector('#form_add_pkm_team');

    // Supprime l'ancien écouteur s'il existe
    if (form.dataset.listener) {
      form.removeEventListener('submit', modals.addPokemonSubmitHandler);
      form.dataset.listener = ''; // Supprime la référence
    }

    // Ajoute le nouvel écouteur
    form.addEventListener('submit', modals.addPokemonSubmitHandler);
    form.dataset.listener = 'true'; // Marque qu'un écouteur est attaché
  },

  handleTeamModal(teamId) {
    const teamModal = document.getElementById("team_modal");
    teamModal.classList.add("is-active");
    modals.currentTeamId = teamId; // Stocker l'ID de l'équipe actuelle
    modals.displayTeamModal(teamId);

    // Fermer en cliquant sur le bouton close
    const closeButtons = teamModal.querySelectorAll(".close");
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        teamModal.classList.remove("is-active");
      });
    });

    // Fermer en cliquant sur le background
    const modalBackground = teamModal.querySelector(".modal-background");
    modalBackground.addEventListener('click', () => {
      teamModal.classList.remove("is-active");
    });
  },

  async displayTeamModal(teamId) {
    console.log("displayTeamModal");

    const teamDetails = await api.getOneTeam(teamId);
    if (!teamDetails) {
      alert("Impossible de charger l'équipe !");
      return;
    }

    document.querySelector('.team_name').textContent = teamDetails.name;
    document.querySelector('.team_description').textContent = teamDetails.description;


    const tbody = document.getElementById("tbody_team");
    tbody.innerHTML = "";

    teamDetails.pokemons.forEach(pkm => {
      const tr = document.createElement("tr");

      const tdNumero = document.createElement("td");
      tdNumero.textContent = pkm.id;
      tr.appendChild(tdNumero);

      const tdName = document.createElement("td");
      tdName.textContent = pkm.name;
      tr.appendChild(tdName);

      const tdHp = document.createElement("td");
      tdHp.textContent = pkm.hp;
      tr.appendChild(tdHp);

      const tdAtk = document.createElement("td");
      tdAtk.textContent = pkm.atk;
      tr.appendChild(tdAtk);

      const tdDef = document.createElement("td");
      tdDef.textContent = pkm.def;
      tr.appendChild(tdDef);

      const tdAtkSpe = document.createElement("td");
      tdAtkSpe.textContent = pkm.atk_spe;
      tr.appendChild(tdAtkSpe);

      const tdDefSpe = document.createElement("td");
      tdDefSpe.textContent = pkm.def_spe;
      tr.appendChild(tdDefSpe);

      const tdSpeed = document.createElement("td");
      tdSpeed.textContent = pkm.speed;
      tr.appendChild(tdSpeed);

      const tdTypes = document.createElement("td");
      tdTypes.textContent = pkm.types.map(type => type.name).join(", ");
      tr.appendChild(tdTypes);

      const tdOptions = document.createElement("td");
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa", "fa-trash");
      deleteIcon.setAttribute('data-pokemon-id', pkm.id);
      tdOptions.appendChild(deleteIcon);
      tr.appendChild(tdOptions);

      tbody.appendChild(tr);
    });

    const editIcon = document.querySelector('.edit');
    editIcon.addEventListener('click', () => {
      const form = document.querySelector('#team_modal form');
      const input = document.querySelector('.input_team_name');
      const teamNameElement = document.querySelector('.team_name');
      
      // Afficher le formulaire et cacher le titre
      form.classList.remove('hidden');
      teamNameElement.style.display = 'none';
      
      // Pré-remplir le champ avec le nom actuel
      if (input) {
        input.value = teamDetails.name;
        input.focus();
      }
    });

    const input = document.querySelector('.input_team_name');
    if (input) {
      input.addEventListener('input', () => {
        const form = document.querySelector('#team_modal form');
        form.classList.remove('hidden');
      });
      
      // Gérer la soumission avec la touche Entrée
      input.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          
          const newName = input.value.trim();
          if (!newName) {
            alert("Le nom de l'équipe ne peut pas être vide !");
            return;
          }
          
          const success = await team.editTeam(teamId, { name: newName });
          if (success) {
            alert("Équipe modifiée avec succès !");
            // Rafraîchir la modal
            await modals.displayTeamModal(teamId);
            // Rafraîchir la liste principale des équipes
            team.load();
            // Cacher le formulaire et afficher le titre
            const form = document.querySelector('#team_modal form');
            const teamNameElement = document.querySelector('.team_name');
            form.classList.add('hidden');
            teamNameElement.style.display = 'block';
          } else {
            alert("Erreur lors de la modification de l'équipe.");
          }
        }
      });
    }

    const deletePokemonFromTeam = document.querySelectorAll(".fa-trash");
    deletePokemonFromTeam.forEach(icon => {
      icon.addEventListener('click', async () => {
        const pokemonId = icon.getAttribute('data-pokemon-id');
        const success = await pokemon.removePokemonFromTeam({ teamId, pokemonId });
        if (success) {
          // Rafraîchir la modal
          await modals.displayTeamModal(teamId);
          // Rafraîchir la liste principale des équipes
          team.load();
          console.log("Pokémon supprimé avec succès !");
        } else {
          alert("Erreur lors de la suppression du Pokémon !");
        }
      });
    });

    // Gestion du bouton "Ajouter Pokémon"
    const addPokemonButton = document.getElementById('add_pokemon_to_team');
    if (addPokemonButton) {
      // Vérifier si l'équipe est pleine
      const isTeamFull = teamDetails.pokemons && teamDetails.pokemons.length >= 6;
      
      if (isTeamFull) {
        addPokemonButton.disabled = true;
        addPokemonButton.innerHTML = '<i class="fas fa-ban"></i><span>Équipe complète</span>';
        addPokemonButton.classList.remove('is-primary');
        addPokemonButton.classList.add('is-light');
      } else {
        addPokemonButton.disabled = false;
        addPokemonButton.innerHTML = '<i class="fas fa-plus"></i><span>Ajouter Pokémon</span>';
        addPokemonButton.classList.remove('is-light');
        addPokemonButton.classList.add('is-primary');
        
        // Ajouter l'événement click
        addPokemonButton.addEventListener('click', () => {
          modals.openPokemonSelectionModal(teamId);
        });
      }
    }


  },

  // Fonction de gestionnaire d'événement pour la création d'équipe
  createTeamSubmitHandler: function(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    team.creatTeam(data); // Utilise la fonction créatTeam du module team
    document.getElementById("add_team_modal").classList.remove("is-active"); // Ferme la modale
  },



  creatTeamModal() {
    const addTeam = document.getElementById("add_team_modal");
    addTeam.classList.add("is-active");

    // Fermer en cliquant sur le bouton close
    const closeButtons = addTeam.querySelectorAll(".close");
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        addTeam.classList.remove("is-active");
      });
    });

    // Fermer en cliquant sur le background
    const modalBackground = addTeam.querySelector(".modal-background");
    modalBackground.addEventListener('click', () => {
      addTeam.classList.remove("is-active");
    });

    const form = document.getElementById('form_team_modal');

    // Supprime l'ancien écouteur s'il existe
    if (form.dataset.listener) {
      form.removeEventListener('submit', modals.createTeamSubmitHandler);
      form.dataset.listener = '';
    }

    // Ajoute le nouvel écouteur
    form.addEventListener('submit', modals.createTeamSubmitHandler);
    form.dataset.listener = 'true';
  },

  async openPokemonSelectionModal(teamId) {
    // Créer une modale dynamique pour la sélection de Pokémon
    const modalHTML = `
      <div class="modal is-active" id="pokemon_selection_modal">
        <div class="modal-background"></div>
        <div class="modal-content">
          <header class="modal-card-head">
            <h2 class="modal-card-title">Sélectionner un Pokémon</h2>
            <i class="fa fa-window-close close"></i>
          </header>
          <div class="modal-card-body">
            <div class="field">
              <label class="label">Rechercher un Pokémon</label>
              <div class="control">
                <input class="input" type="text" id="pokemon_search" placeholder="Tapez le nom d'un Pokémon...">
              </div>
            </div>
            <div class="cards-grid" id="pokemon_selection_grid">
              <!-- Les Pokémon seront chargés ici -->
            </div>
            <div class="has-text-centered mt-4" id="load_more_container" style="display: none;">
              <button class="button is-primary" id="load_more_pokemon">
                <i class="fas fa-plus"></i>
                <span>Voir plus de Pokémon</span>
              </button>
            </div>
          </div>
          <footer class="modal-card-foot">
            <div class="buttons">
              <button class="button close">Annuler</button>
            </div>
          </footer>
        </div>
      </div>
    `;

    // Ajouter la modale au DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Variables pour le chargement progressif
    let allPokemons = [];
    let displayedCount = 0;
    const pokemonGrid = document.getElementById('pokemon_selection_grid');
    const loadMoreContainer = document.getElementById('load_more_container');
    const loadMoreButton = document.getElementById('load_more_pokemon');

    // Fonction pour créer une carte Pokémon
    const createPokemonCard = (pokemon) => {
      const pokemonCard = document.createElement('div');
      pokemonCard.className = 'pokemon-card';
      pokemonCard.innerHTML = `
        <div class="pokemon-card-container">
          <div class="pokemon-card-inner" style="cursor: pointer;">
            <div class="pokemon-image-container">
              <img class="pokemon-image" src="/images/${pokemon.id}.webp" />
            </div>
            <div class="pokemon-info">
              <h3 class="pokemon-name">${pokemon.name}</h3>
              <div class="pokemon-types">
                ${pokemon.types ? pokemon.types.map(type => 
                  `<span class="type-badge" style="background: linear-gradient(135deg, #${type.color}, ${lightenColor('#' + type.color, 30)})">${type.name}</span>`
                ).join('') : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      // Ajouter l'événement click pour sélectionner le Pokémon
      pokemonCard.addEventListener('click', async () => {
        const success = await pokemon.addPokemonToTeam({ teamId, pokemonId: pokemon.id });
        if (success) {
          alert("Pokémon ajouté à l'équipe avec succès !");
          // Fermer la modale de sélection
          document.getElementById('pokemon_selection_modal').remove();
          // Rafraîchir la modale d'équipe
          await modals.displayTeamModal(teamId);
          // Rafraîchir la liste principale des équipes
          team.load();
        } else {
          alert("Erreur lors de l'ajout du Pokémon à l'équipe.");
        }
      });

      return pokemonCard;
    };

    // Fonction pour afficher plus de Pokémon
    const displayMorePokemon = () => {
      const pokemonsToShow = allPokemons.slice(displayedCount, displayedCount + 20);
      pokemonsToShow.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);
        pokemonGrid.appendChild(pokemonCard);
      });
      
      displayedCount += 20;
      
      // Masquer le bouton si tous les Pokémon sont affichés
      if (displayedCount >= allPokemons.length) {
        loadMoreContainer.style.display = 'none';
      }
      
      // Mettre à jour le compteur
      updateSearchCounter();
    };

    // Fonction pour mettre à jour le compteur de recherche
    const updateSearchCounter = () => {
      const searchLabel = document.querySelector('#pokemon_search').parentElement.querySelector('.label');
      if (searchLabel) {
        const visibleCards = pokemonGrid.querySelectorAll('.pokemon-card[style*="display: block"], .pokemon-card:not([style*="display: none"])');
        const searchTerm = document.getElementById('pokemon_search').value;
        
        if (searchTerm === '') {
          searchLabel.textContent = `Rechercher un Pokémon (${displayedCount}/${allPokemons.length} Pokémon affichés)`;
        } else {
          searchLabel.textContent = `Rechercher un Pokémon (${visibleCards.length} résultat${visibleCards.length > 1 ? 's' : ''} trouvé${visibleCards.length > 1 ? 's' : ''})`;
        }
      }
    };

    // Charger tous les Pokémon
    allPokemons = await api.getAllPokemons();
    
    // Afficher les 20 premiers Pokémon
    displayMorePokemon();
    
    // Afficher le bouton "Voir plus" s'il y a plus de Pokémon
    if (allPokemons.length > 20) {
      loadMoreContainer.style.display = 'block';
    }

    // Gestion du bouton "Voir plus"
    loadMoreButton.addEventListener('click', () => {
      displayMorePokemon();
    });

    // Gestion de la recherche
    const searchInput = document.getElementById('pokemon_search');
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const cards = pokemonGrid.querySelectorAll('.pokemon-card');
      
      let visibleCount = 0;
      cards.forEach(card => {
        const pokemonName = card.querySelector('.pokemon-name').textContent.toLowerCase();
        if (pokemonName.includes(searchTerm)) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Masquer le bouton "Voir plus" pendant la recherche
      if (searchTerm !== '') {
        loadMoreContainer.style.display = 'none';
      } else {
        // Remontrer le bouton si la recherche est vide et qu'il y a plus de Pokémon
        if (displayedCount < allPokemons.length) {
          loadMoreContainer.style.display = 'block';
        }
      }
      
      // Mettre à jour le compteur
      updateSearchCounter();
    });

    // Gestion de la fermeture de la modale
    const closeButtons = document.querySelectorAll('#pokemon_selection_modal .close');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        document.getElementById('pokemon_selection_modal').remove();
      });
    });

    const modalBackground = document.querySelector('#pokemon_selection_modal .modal-background');
    modalBackground.addEventListener('click', () => {
      document.getElementById('pokemon_selection_modal').remove();
    });
  }
};

export default modals;