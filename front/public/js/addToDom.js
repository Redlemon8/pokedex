import type from './type.js';
import modals from './modal.js';

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

// Configuration des types Pokémon avec leurs icônes
function getTypeConfig(typeName) {
  const configs = {
    'Feu': { icon: 'fas fa-fire' },
    'Eau': { icon: 'fas fa-tint' },
    'Plante': { icon: 'fas fa-seedling' },
    'Électrik': { icon: 'fas fa-bolt' },
    'Glace': { icon: 'fas fa-snowflake' },
    'Combat': { icon: 'fas fa-fist-raised' },
    'Poison': { icon: 'fas fa-skull-crossbones' },
    'Sol': { icon: 'fas fa-mountain' },
    'Vol': { icon: 'fas fa-feather-alt' },
    'Psy': { icon: 'fas fa-brain' },
    'Insecte': { icon: 'fas fa-bug' },
    'Roche': { icon: 'fas fa-circle' },
    'Spectre': { icon: 'fas fa-ghost' },
    'Dragon': { icon: 'fas fa-dragon' },
    'Ténèbres': { icon: 'fas fa-moon' },
    'Acier': { icon: 'fas fa-shield-alt' },
    'Normal': { icon: 'fas fa-circle' }
  };
  
  return configs[typeName] || { icon: 'fas fa-question' };
}

const addToDom = {

  displayPokemons(pokemons) {
    
    // Vérifier si le conteneur cards-grid existe, sinon le créer
    let cardsGrid = document.querySelector('.cards-grid');
    if (!cardsGrid) {
      cardsGrid = document.createElement('div');
      cardsGrid.className = 'cards-grid';
      document.getElementById("app").appendChild(cardsGrid);
    }
    
    // Display pokemons to the DOM
    const template = document.querySelector('.template-pokemon');
    const clone = template.content.cloneNode(true);
    
    // Mettre à jour l'image et le nom
    clone.querySelector(".pokemon-image").src = "/images/" + pokemons.id + ".webp";
    clone.querySelector(".pokemon-name").textContent = pokemons.name;
    
    // Gérer les types du Pokémon
    const typesContainer = clone.querySelector('.pokemon-types');
    typesContainer.innerHTML = '';
    
    if (pokemons.types && pokemons.types.length > 0) {
      pokemons.types.forEach(type => {
        const typeBadge = document.createElement('span');
        typeBadge.className = 'type-badge';
        typeBadge.textContent = type.name;
        
        // Appliquer la couleur du type depuis la BDD
        const color = type.color;
        const gradientColor = `#${color}`;
        const lighterColor = lightenColor(gradientColor, 30);
        typeBadge.style.background = `linear-gradient(135deg, ${gradientColor}, ${lighterColor})`;
        
        typesContainer.appendChild(typeBadge);
      });
    }
    
    // Appliquer un gradient de fond basé sur le premier type
    const cardInner = clone.querySelector('.pokemon-card-inner');
    if (pokemons.types && pokemons.types.length > 0) {
      const primaryType = pokemons.types[0];
      const color = primaryType.color;
      const gradientColor = `#${color}`;
      const lighterColor = lightenColor(gradientColor, 60); // Plus clair pour le fond
      cardInner.style.background = `linear-gradient(135deg, ${lighterColor}40, ${gradientColor}30)`;
    }

    const card = clone.querySelector('.pokemon-card-inner');
    card.dataset.pokemons = pokemons.id;
    cardsGrid.appendChild(clone);

    card.addEventListener('click', () => modals.handleModal(pokemons.id));

  },

  displayTypes(types) {

    // Vérifier si le conteneur cards-grid existe, sinon le créer
    let cardsGrid = document.querySelector('.cards-grid');
    if (!cardsGrid) {
      cardsGrid = document.createElement('div');
      cardsGrid.className = 'cards-grid';
      document.getElementById("app").appendChild(cardsGrid);
    }

    // Select types element into the dom
    const template = document.querySelector('.template-type');
    const clone = template.content.cloneNode(true);
    const typeButton = clone.querySelector('.type-button');
    const typeIcon = clone.querySelector('.type-icon i');
    const typeName = clone.querySelector('.type-name');
    const typeCount = clone.querySelector('.type-count');
    
    // Définir l'icône selon le type
    const typeConfig = getTypeConfig(types.name);
    typeIcon.className = typeConfig.icon;
    
    // Utiliser la couleur de la BDD pour créer un gradient
    const color = types.color;
    const gradientColor = `#${color}`;
    const lighterColor = lightenColor(gradientColor, 30); // Éclaircir de 30%
    typeButton.style.background = `linear-gradient(135deg, ${gradientColor}, ${lighterColor})`;
    
    // Mettre à jour le contenu
    typeName.textContent = types.name;
    typeCount.textContent = `${types.pokemons ? types.pokemons.length : 0} Pokémon`;
    
    // Display types to the dom
    cardsGrid.appendChild(clone);
    
    // EventListener on click type button
    typeButton.addEventListener('click', () => type.displayPokemonByType(types.id));
    
  },

  async displayTeams(teams) {
    const template = document.querySelector('.template-team');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.team-name').textContent = teams.name;
    clone.querySelector('.team-description').textContent = teams.description;

    const imgContainer = clone.querySelector('.imgContainer');
    imgContainer.innerHTML = '';

    // Create figure element
    const figure = document.createElement('figure');
    figure.classList.add('image', 'is-flex', 'is-justify-content-center');

    if (teams.pokemons && Array.isArray(teams.pokemons)) {
      // Récupérer les données complètes des Pokémon avec leurs types
      const pokemonPromises = teams.pokemons.map(pokemon => 
        fetch(`http://localhost:3000/pokemons/${pokemon.id}`).then(res => res.json())
      );
      
      try {
        const pokemonsWithTypes = await Promise.all(pokemonPromises);
        
        // Collecter tous les types uniques de l'équipe
        const allTypes = new Set();
        pokemonsWithTypes.forEach(pokemon => {
          if (pokemon.types && pokemon.types.length > 0) {
            allTypes.add(pokemon.types[0].color);
          }
        });
        
        // Appliquer une couleur au container basée sur les types
        if (allTypes.size > 0) {
          // Container avec une couleur uniforme (bleu clair)
          imgContainer.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 0.15), rgba(155, 89, 182, 0.15))';
          imgContainer.style.borderColor = 'rgba(52, 152, 219, 0.3)';
        }
        
        // Créer les images avec les couleurs des types
        pokemonsWithTypes.forEach(pokemon => {
          const img = document.createElement('img');
          img.classList.add('pokemon-team-image', 'is-rounded', 'mx-2', 'is-16x16');
          img.src = "/images/" + pokemon.id + ".webp";
          
          // Appliquer la couleur du type principal du Pokémon (moins opaque)
          if (pokemon.types && pokemon.types.length > 0) {
            const primaryType = pokemon.types[0];
            const color = primaryType.color;
            const gradientColor = `#${color}`;
            const lighterColor = lightenColor(gradientColor, 30);
            // Couleur moins opaque (0.3 au lieu de 1)
            img.style.background = `linear-gradient(135deg, ${gradientColor}30, ${lighterColor}30)`;
            img.style.borderColor = 'rgba(255, 255, 255, 0.9)';
          }
          
          // open modal to each pokemon by img click
          img.addEventListener('click', () => modals.handleModal(pokemon.id));
          // Add img to each team figure
          figure.append(img);
        });
        
      } catch (error) {
        console.error('Erreur lors du chargement des types des Pokémon:', error);
        // Fallback : afficher les images sans couleurs de types
        teams.pokemons.forEach(pokemon => {
          const img = document.createElement('img');
          img.classList.add('pokemon-team-image', 'is-rounded', 'mx-2', 'is-16x16');
          img.src = "/images/" + pokemon.id + ".webp";
          img.addEventListener('click', () => modals.handleModal(pokemon.id));
          figure.append(img);
        });
      }
    }

    // display each figure to the img container
    imgContainer.append(figure);

    const btnModalTeam = clone.querySelector('.btnModalTeam');
    btnModalTeam.dataset.teams = teams.id;

    document.getElementById("app").append(clone);

    btnModalTeam.addEventListener('click', () => modals.handleTeamModal(teams.id));
  },
}

export default addToDom;