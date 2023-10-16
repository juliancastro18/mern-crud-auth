import mongoose from 'mongoose';
import { Db } from 'mongoose/node_modules/mongodb';
import config from '../config/index.js'

export default async (): Promise<Db> => {
    try {
        const connection = await mongoose.connect(config.databaseURL);
        return connection.connection.db;
    } catch (error) {
        console.log(error);
    }
}