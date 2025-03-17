import { Model, DataTypes } from 'sequelize';
import { sequelize } from './connection.js'

export class Type extends Model {}

Type.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.TEXT,
            defaultValue: '#FFFFFF',
            allowNull: false,
        },
    },{
        sequelize,
        tableName: 'type',
    });