import { Pokemon } from "../models/associations.js";

const pokemonController = {

    async index(req, res) {
        res.status(200).json(await Pokemon.findAll({
            include: ["types", "teams"],
        }));
    },
}

export { pokemonController };