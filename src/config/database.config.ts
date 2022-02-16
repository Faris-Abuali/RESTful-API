import { Sequelize } from 'sequelize';
import 'dotenv/config' 

let dbInfo: string[] = [
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
]
const db = new Sequelize(dbInfo[0], dbInfo[1], dbInfo[2], {
    dialect: 'mysql',
    // logging: false
});

export default db;