import express from 'express';
import User from '../models/Food.js';
import Food from '../models/Food.js';
import Refrigerator from '../models/Refrigerator.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // get user input
        const { name, email, password, refrigeratorID } = req.body;

        // check if all fields are filled
        if (!name || !email || !password || !refrigeratorID ) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }    

        // find refrigerator
        const refrigerator = await Refrigerator.findById(refrigeratorID);
        if (!refrigerator) {
            return res.status(404).json({ message: 'Refrigerator not found'});
        }

        // create new food from input
        const newUser = new Food({ 
            name,
            email,
            password, 
            refrigerator: refrigeratorID,
        });

        // save food
        await newUser.save();

        // add food to refrigerator
        refrigerator.foodList.push(newUser._id);
        await refrigerator.save();

        res.status(201).json(newFood);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }

router.get('/:id', async (req, res) => {
    try {
        const userFind = await User.findById(req.params.id)
        .populate('name')
        .populate('email')
        .populate('refrigerator');

        if (!userFind) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json(userFind);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    });
});

export default router;