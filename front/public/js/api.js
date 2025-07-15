const api = {
  baseUrl: "http://localhost:3000",

  async getPokemons() {
    try {
      const response = await fetch(api.baseUrl + "/pokemons");

      if (!response.ok) {
          console.error(response);
          return null;
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Alias pour getAllPokemons
  async getAllPokemons() {
    return await this.getPokemons();
  },

  async getOnePokemon(pokemonId) {
    try {
      const response = await fetch(api.baseUrl + "/pokemons/" + pokemonId);

      if (!response.ok) {
          console.error(response);
          return null;
      }

      return await response.json();

    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getTypes() {
    try {
      const response = await fetch(api.baseUrl + "/types");

      if (!response.ok) {
          console.error(response);
          return null;
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getOneType(typeId) {
    try {
      const response = await fetch(api.baseUrl + "/types/" + typeId);

      if (!response.ok) {
          console.error(response);
          return null;
      }

      return await response.json();

    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getTeams() {
    try {
      const response = await fetch(api.baseUrl + "/teams");

      if (!response.ok) {
          console.error(response);
          return null;
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getOneTeam(teamId) {
    try {
      const response = await fetch(api.baseUrl + "/teams/" + teamId);
      
      if (!response.ok) {
          console.error(response);
          return null;
      }

      return await response.json();

    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async createTeam(data) {
    try {
      const response = await fetch(api.baseUrl + '/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {

        console.error(response);
        return null;
      }

      return await response.json();

    } catch (error) {
        console.error(error);
        return null;
    }
  },

  async addPokemonToTeam(teamId, pokemonId) {
    try {
      console.log('function add pokemon to team', teamId, pokemonId);
      const response = await fetch(api.baseUrl + '/teams/' + teamId + "/pokemons", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemonId: pokemonId }),
      });

      if (!response.ok) {

        console.error(response);
        return null;
      }

      return await response.json();

    } catch (error) {
        console.error(error);
        return null;
    }
  },

  async removePokemonFromTeam(teamId, pokemonId) {
    try {
      const response = await fetch(api.baseUrl + '/teams/' + teamId + "/pokemons", {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemonId: pokemonId }),
      });

      if (!response.ok) {
        console.error(response);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async editTeam(teamId, data) {
    try {
      const response = await fetch(api.baseUrl + '/teams/' + teamId, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error(response);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};


export default api;