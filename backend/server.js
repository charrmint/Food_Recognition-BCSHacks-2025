import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import refrigeratorRoutes from './routes/refrigeratorRoutes.js';
import authRoutes from './routes/authRoutes.js';
import scanRoutes from './routes/scanRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI

try {
    mongoose.connect(MONGO_URI)
    .then(() => {
        // test
        app.get("/api/test", (req, res) => {
            res.send("API is working");
        });
        console.log(`MongoDB Connected:`, process.env.MONGO_URI);
        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/refrigerator', refrigeratorRoutes);
        app.use('/api/scan', scanRoutes)
        

        // Server Listening
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}