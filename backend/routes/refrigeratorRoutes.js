import express from 'express'
import Refrigerator from '../models/Refrigerator.js';
import User from '../models/User.js';
import Food from '../models/Food.js'

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, userIds, foodMap, currentImage, pastImage } = req.body;

        const users = await User.find({ '_id': { $in: userIds } });

        const refrigerator = new Refrigerator({
            name,
            userList: users.map(user => user._id),
            foodMap: foodMap,
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
        .populate('userList')
        .populate('foodList');

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

        refrigerator.userList = refrigerator.userList.filter(user => user.toString() !== userId);

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

router.post('/addFood', async (req, res) => {
    try {
        const { foodName, quantity, refrigeratorID} = req.body;
        if (!foodName || !quantity || !refrigeratorID) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        // Find the refrigerator by ID
        const refrigerator = await Refrigerator.findById(refrigeratorID);
        if (!refrigerator) {
            return res.status(404).json ({
                message: "Refrigerator not found"
            });
        }

        // Update the foods map with the new food item and its quantity
        // If the food already exists, update the quantity
        if (refrigerator.foodMap.has(foodName)) {
            refrigerator.foodMap.set(foodName, {
                quantity: refrigerator.foodMap.get(foodName).quantity + quantity,
            });
        } else {
            refrigerator.foodMap.set(foodName, {
                quantity
            });
        }

        // Save the updated refrigerator document
        await refrigerator.save();
        res.status(201).json({
            message: "Food added successfully", refrigerator
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }

});

export default router;