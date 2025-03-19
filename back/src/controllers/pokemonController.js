import { Pokemon } from "../models/associations.js";

const pokemonController = {

    async index(req, res) {
        res.status(200).json(await Pokemon.findAll());
    },

    async showOne(req, res) {

        const pokemonId = req.params.id;

        const result = await Pokemon.findByPk(pokemonId);

        if (!result) {
            return next();
        }

        res.status(200).json(result);
    }
}

export { pokemonController };