import { Router } from 'express';
import { pokemonController } from './controllers/pokemonController.js';
import { typeController } from './controllers/typeContoller.js';
import { teamController } from './controllers/teamController.js';

const router = Router();

router.get("/pokemons", pokemonController.index);
router.get("/pokemons/:id(\\d+)", pokemonController.showOne);

router.get("/types", typeController.index);
router.get("/types/:id(\\d+)", typeController.showPokemonByType);

router.get("/teams", teamController.index);
router.get("/teams/:id(\\d+)", teamController.showTeamById);
router.post("/teams", teamController.creatTeam);
router.patch("/teams/:id(\\d+)", teamController.editTeam);
router.delete("/teams/:id(\\d+)", teamController.deleteTeam);

export { router };