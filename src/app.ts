import 'reflect-metadata'; // We need this in order to use @Decorators
import express from 'express';
import config from './config/index.js';

async function startServer() {
  const app = express();

  (await import('./loaders/index.js')).default({ expressApp: app });

  app.listen(config.port).on('error', err => {
    process.exit(1);
  });

}

startServer();