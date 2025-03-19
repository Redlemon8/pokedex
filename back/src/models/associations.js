import { sequelize } from './connection.js';
import { Pokemon } from './Pokemon.js';
import { Team } from './Team.js';
import { Type } from './Type.js';

Pokemon.belongsToMany(Team, {
    as: "teams",
    through: "team_pokemon",
    foreignKey: "pokemon_team_id",
    otherKey: "team_id"
});

Team.belongsToMany(Pokemon, {
    as: "pokemons",
    through: "team_pokemon",
    foreignKey: "team_id",
    otherKey: "pokemon_team_id"
});

Type.belongsToMany(Pokemon, {
    as: "pokemons",
    through: "pokemon_type",
    foreignKey: "type_id",
    otherKey: "pokemon_type_id"
});

Pokemon.belongsToMany(Type, {
    as: "types",
    through: "pokemon_type",
    foreignKey: "pokemon_type_id",
    otherKey: "type_id"
});

export { Pokemon, Team, Type, sequelize };