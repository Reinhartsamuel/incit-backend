import { Sequelize } from 'sequelize-typescript';
import { Users } from '../models/users';
import dotenv  from "dotenv"

dotenv.config();

const connection = new Sequelize({
    dialect: 'mysql',
    host:process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
    database: process.env.DB_NAME,
    logging:false,
    models: [Users],
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})



export default connection;

 