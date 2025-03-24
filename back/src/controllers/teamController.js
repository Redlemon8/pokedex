import { Team } from "../models/associations.js";

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
  }
}

export { teamController };