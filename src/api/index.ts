import { Router } from 'express';
import auth from './routes/auth.js';
import tasks from './routes/tasks.js';

export default () => {
  const app = Router();
  auth(app);
  tasks(app);

  return app;
}