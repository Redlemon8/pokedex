import { Router } from 'express';
import { pokemonController } from './controllers/pokemonController.js';


const router = Router();

router.get("/pokemons", pokemonController.index);


export { router };