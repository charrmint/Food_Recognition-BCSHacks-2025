import express from 'express';
import Food from '../models/Food.js';
import Refrigerator from '../models/Refrigerator.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, refrigeratorID } = req.body;

    if (!name || !refrigeratorID ) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    // try {
    //     const newFood = new Food({ name, refrigerator: refrigeratorID});
    //     await newFood.save();

    //     // add to refrigerator
    //     await Refrigerator.findByIdAndUpdate(refrigeratorID, 

    //     )
    // }
})