import express from 'express'
import Refrigerator from '../models/Refrigerator.js';
import User from '../models/User.js';
import Food from '../models/Food.js'

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, userIds, foodIds, currentImage, pastImage } = req.body;

        const users = await User.find({ '_id': { $in: userIds } });
        const foods = await Food.find({ '_id': { $in: foodIds } });

        const refrigerator = new Refrigerator({
            name,
            userList: users.map(user => user._id),
            foodList: foods.map(food => food._id),
            currentImage,
            pastImage
        });

        await refrigerator.save();
        res.status(201).json(refrigerator);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;