import express from 'express';
import Food from '../models/Food.js';
import Refrigerator from '../models/Refrigerator.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // get user input
        const { name, refrigeratorID } = req.body;

        // check if all fields are filled
        if (!name || !refrigeratorID ) {
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
        const newFood = new Food({ 
            name, 
            refrigerator: refrigeratorID,
        });

        // save food
        await newFood.save();

        // add food to refrigerator
        refrigerator.foodList.push(newFood.food_id);
        await refrigerator.save();

        res.status(201).json(newFood);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foodItem = await Food.findById(req.params.id).populate('refrigerator');
        if (!foodItem) {
            return res.status(401).json({ message: 'Food not found' });
        }
        res.status(200).json(foodItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;