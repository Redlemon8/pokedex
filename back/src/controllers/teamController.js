import { Pokemon, Team } from "../models/associations.js";

const teamController = {

  async index(req, res) {
    res.status(200).json(await Team.findAll( {
        include: ["pokemons"],
    }));
  },

  async showTeamById(req, res, next) {
      
    const teamId = req.params.id;

    const result = await Team.findByPk(teamId, {
      include: [
        { association: "pokemons", include: [
          { association: "types"}
        ]},
      ]
    });

    if (!result) {
        return next();
    }

    res.status(200).json(result);
      
  },

  async creatTeam(req, res, next) {

    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400)
    }

    try {

      const result = await Team.create(req.body);

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
        // On pourrait probablement fouiller un peu la variable error pour avoir un message d'erreur plus clair, mais c'est pas le sujet du cours
        return next({statusCode: 400, message: "Erreur lors de l'enregistrement en BDD !!!"});
    }
    
  },

  async editTeam(req, res, next) {

    try {

      const teamId = req.params.id;
      const team = await Team.findByPk(teamId);
    
      if (!team) {
        return next();
      }

      const { name, description } = req.body;

      if (name) {
        team.name = name;
      }

      if (description) {
        team.description = description;
      }

      await team.save();
      

      res.status(200).json(team);
    } catch (error) {
      console.log(error);
        // On pourrait probablement fouiller un peu la variable error pour avoir un message d'erreur plus clair, mais c'est pas le sujet du cours
        return next({statusCode: 400, message: "Erreur lors de l'enregistrement en BDD !!!"});
    }
  },

  async deleteTeam(req, res, next) {

    try {

      const team = await Team.findByPk(req.params.id);
    
      if (!team) {
        return next();
      }

      await team.destroy();
      
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
        // On pourrait probablement fouiller un peu la variable error pour avoir un message d'erreur plus clair, mais c'est pas le sujet du cours
        return next({statusCode: 400, message: "Erreur lors de l'enregistrement en BDD !!!"});
    }
  },

  async addPokemonToTeam(req, res, next) {
    const teamId = req.params.id;
    const { pokemonId } = req.body;

    console.log(teamId, pokemonId);

    if (!pokemonId) {
      return res.status(400).json({ message: "L'ID du pokemon est requis." })
    }

    try {
      const team = await Team.findByPk(teamId, { include: [{ association: "pokemons" }] });
      const pokemon = await Pokemon.findByPk(pokemonId);

      if (!team) {
        return res.status(404).json({ message: "Equipe non trouvé." });
      }

      if (!pokemon) {
        return res.status(404).json({ message: "Pokémon non trouvé." });
      }

      // Vérifier la limite de 6 Pokémon par équipe
      if (team.pokemons && team.pokemons.length >= 6) {
        return res.status(400).json({ message: "Cette équipe est déjà complète (6 Pokémon maximum)." });
      }

      await team.addPokemon(pokemon);

      const updateTeam = await Team.findByPk(teamId, { include: [{ association: "pokemons", include: [{ association: "types" }] }],
      });

      res.status(200).json(updateTeam);
    } catch (error) {
      console.error("Erreur lors de l'ajout du Pokémon à l'équipe : ", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: "Ce Pokémon est déjà dans cette équipe." });
      }
      return next({ statusCode: 500, message: "Erreur interne du serveur lors de l'ajout du Pokémon à l'équipe." });
    }
  },

  async removePokemonFromTeam(req, res, next) {
    const teamId = req.params.id;
    const { pokemonId } = req.body;

    console.log(teamId, pokemonId);

    try {
      const team = await Team.findByPk(teamId);
      const pokemon = await Pokemon.findByPk(pokemonId);

      if (!team) {
        return res.status(404).json({ message: "Equipe non trouvé." });
      }

      if (!pokemon) {
        return res.status(404).json({ message: "Pokémon non trouvé." });
      }

      await team.removePokemon(pokemon);

      const updateTeam = await Team.findByPk(teamId, { include: [{ association: "pokemons", include: [{ association: "types" }] }],
      });

      res.status(200).json(updateTeam);
    } catch (error) {
      console.error("Erreur lors de la suppression du Pokémon de l'équipe : ", error);
      return next({ statusCode: 500, message: "Erreur interne du serveur lors de la suppression du Pokémon de l'équipe." });
    }
  }
}

export { teamController };