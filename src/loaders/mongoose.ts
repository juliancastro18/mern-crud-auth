import mongoose from 'mongoose';
import config from '../config/index.js'
import { Db } from 'mongoose/node_modules/mongodb';

export default async (): Promise<Db> => {
    try {
        const connection = await mongoose.connect(config.databaseURL);
        return connection.connection.db;
    } catch (error) {
        console.log(error);
    }
}