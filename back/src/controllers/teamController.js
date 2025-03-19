import { Team } from "../models/associations.js";

const teamController = {

    async index(req, res) {
        res.status(200).json(await Team.findAll( {
            include: ["pokemons"],
        }));
    },
}

export { teamController };