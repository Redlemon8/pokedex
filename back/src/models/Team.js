import { Model, DataTypes } from 'sequelize';
import { sequelize } from './connection.js'

export class Team extends Model {}

Team.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },{
        sequelize,
        tableName: 'team',
    });
