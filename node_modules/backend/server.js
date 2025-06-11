import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import refrigeratorRoutes from './routes/refrigeratorRoutes.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, "../.env")});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI

try {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(`MongoDB Connected:`, process.env.MONGO_URI);

        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/user', userRoutes);
        app.use('/api/refrigerator', refrigeratorRoutes);

        // Server Listening
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // process code 1 means exit with failure, 0 means success
}