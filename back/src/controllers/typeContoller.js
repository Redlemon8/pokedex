import { Type } from "../models/associations.js";

const typeController = {

    async index(req, res) {
        res.status(200).json(await Type.findAll());
    },
}

export { typeController };