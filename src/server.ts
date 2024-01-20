/* eslint-disable linebreak-style */
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { DocumentNode } from 'graphql';
import fileUpload from 'express-fileupload';
import musicRoute from './route/musicRoute';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 4000;

async function Server (typeDefs: DocumentNode[], resolvers: any) {
  const server = express();
  const corsOptions = {
    origin: ['http://localhost:5173', 'https://front-links-music.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await apolloServer.start();
  server.use('/files',
    fileUpload({
      useTempFiles: true,
      tempFileDir: './src/uploads'
    }),
    cors(corsOptions),
    morgan('dev'),
    bodyParser.json(),
    musicRoute);
  server.use('/graphql', 
    cors(corsOptions), 
    express.json(),
    expressMiddleware(apolloServer));
  server.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}/graphql`));
}

export default Server;
