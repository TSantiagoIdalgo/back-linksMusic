import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { DATABASE_URL, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DATABASE_URL !== undefined ? DATABASE_URL: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/globantmusic`);

export default sequelize;