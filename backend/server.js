import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import foodRoutes from './routes/foodRoutes.js'
import userRoutes from './routes/userRoutes.js'
import refrigeratorRoutes from './routes/refrigeratorRoutes.js'

dotenv.config();

// console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

// app.post("/products", (req, res) => {
//     const product = req.body; // user will send this data
// });

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI

try {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(`MongoDB Connected:`, process.env.MONGO_URI);

        // Routes
        // app.use('/api/food', foodRoutes);
        app.use('/api/user', userRoutes);
        app.use('/api/refrigerator', refrigeratorRoutes);

        // Server Listening

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // process code 1 means exit with failure, 0 means success
}