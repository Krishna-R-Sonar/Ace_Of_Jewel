import mongoose from 'mongoose';
const dbConfig = process.env.DB_URI || 'mongodb://localhost:27017/jewelryShop';

const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig);

        console.log("MongoDB connected!")
    } catch (error){
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;