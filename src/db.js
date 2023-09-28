import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('>>> DB is connected');
    } catch (error) {
        console.log(error);
    }
}