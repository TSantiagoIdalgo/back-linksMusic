import Server from './src/server';
import sequelize from './src/database/db';
import { typeDefs } from './src/schemas/schema';
import { resolvers } from './src/resolvers/resolver';
import './src/database/association/association';


(async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log('Connection has been established successfully.');
    await Server(typeDefs, resolvers);
  } catch (error: any) {
    console.log({ error: error.message });
  }
})();