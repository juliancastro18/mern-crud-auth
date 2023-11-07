import { Router } from 'express';
import auth from './routes/auth.js';
import notes from './routes/notes.js';

export default () => {
  const app = Router();
  auth(app);
  notes(app);

  return app;
}