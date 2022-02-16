import { Model, DataTypes } from 'sequelize';
import db from '../config/database.config'; //our db connection (Sequelize instance) 

interface TodoAttributes {
    id: string;
    title: string;
    completed: boolean;
}

export class TodoInstance extends Model<TodoAttributes> { }

TodoInstance.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize: db, //our db connection (Sequelize instance) 
        tableName: 'todos',
    });
