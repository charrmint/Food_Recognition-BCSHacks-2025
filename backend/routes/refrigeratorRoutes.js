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

// to add assign user, and put food

// get refrigerator, assigned users, and assigned foods
router.get('/:id', async (req, res) => {
    try {
        const refrigerator = await Refrigerator.findById(req.params.id)
        .populate('users')
        .populate('foods');

        if (!refrigerator) {
            return res.status(404).json({ message: 'Refrigerator not found'});
        }

        res.status(200).json(refrigerator);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// remove user
router.put('/:id/removeUser', async (req, res) => {
    try {
        const { userId } = req.body;
        const { id } = req.params;
        
        const refrigerator = await Refrigerator.findById(id);

        if (!refrigerator) {
            return res.status(404).json({ message: 'Refrigerator not found' });
        }

        refrigerator.users = refrigerator.users.filter(user => user.toString() !== userId);

        await refrigerator.save();

        res.status(200).json({ message: 'User removed succesfully', refrigerator });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// remove foods
router.put('/:id/removeFoods', async (req, res) => {
    try {
        const { foodIds } = req.body;
        const { id } = req.params;

        const refrigerator = await Refrigerator.findById(id);

        if (!refrigerator) {
            return res.status(404).json({ message: 'Refrigerator not found' });
        }

        refrigerator.foodList = refrigerator.foodList.filter(food => !foodIds.includes(food.toString()));

        await refrigerator.save();

        res.status(200).json({ message: 'Foods removed succesfully', refrigerator });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

)

export default router;