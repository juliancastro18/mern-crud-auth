import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config/index.js';
import express from 'express';

async function startServer() {
  const app = express();

  (await import('./loaders/index.js')).default({ expressApp: app });

  app.listen(config.port).on('error', err => {
    process.exit(1);
  });

}

startServer();