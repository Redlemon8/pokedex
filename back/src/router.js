import { Router } from 'express';
import { pokemonController } from './controllers/pokemonController.js';
import { typeController } from './controllers/typeContoller.js';

const router = Router();

router.get("/pokemons", pokemonController.index);
router.get("/pokemons/:id(\\d+)", pokemonController.showOne);

router.get("/types", typeController.index);


export { router };