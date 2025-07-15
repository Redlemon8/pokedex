import { Pokemon, Type } from "../models/associations.js";

const typeController = {

    async index(req, res) {
        res.status(200).json(await Type.findAll({
            include: ["pokemons"]
        }));
    },

    async showPokemonByType(req, res) {

        const typeId = req.params.id;

        const result = await Type.findByPk(typeId, {
            include: ["pokemons"],
            where: {
                typeId: {
                    [Type.pokemon_type_id]: "type_id"
                },
            },
        });

        if (!result) {
            return next();
        }

        res.status(200).json(result);
    }
}

export { typeController };