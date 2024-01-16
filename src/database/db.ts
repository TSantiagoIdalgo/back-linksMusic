import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/links_music`, {
  logging: false,
  host: DB_HOST,
  dialect: 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

export default sequelize;
