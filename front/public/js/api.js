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
    }
};

export default api;