import app from './app.js';
import { connectDB } from './db.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3500;

connectDB();
app.listen(PORT);
console.log('Server on port', PORT);