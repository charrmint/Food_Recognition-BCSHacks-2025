import express from 'express';
import User from '../models/Food.js';
import Food from '../models/Food.js';
import Refrigerator from '../models/Refrigerator.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const {name, email, password, refrigeratorId} = req.body;
    if (!name || !email || !password || !refrigeratorId) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    try {
        const refrigerator = await Refrigerator.findById(refrigeratorId);
        if (!refrigerator) {
            return res.status(404).json({
                error: 'Refrigerator not found'
            });
        }
        
        //Create the new user
        const newUser = new User({name, email, password, refrigerator: refrigeratorId});
        await newUser.save();

        const fridge = await Refrigerator.findById(refrigeratorId);
        fridge.userList.push(newUser._id);
        await fridge.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({success: false, message: "Server Error" });
    }
});

export default router;