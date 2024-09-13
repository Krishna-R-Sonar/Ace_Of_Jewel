import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/';

// mongodb connection
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');

    // start the server after a successful db connection
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // exit process on db connection failure
});

// graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: Closing HTTP server...');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});