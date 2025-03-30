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
router.delete('/:id/removeFoods', async (req, res) => {
    try {
        const { foodName, quantity } = req.body;
        const { id } = req.params;

        const refrigerator = await Refrigerator.findById(id);

        if (!foodName || !quantity) {
            return res.status(400).json({ error: 'Food name and quantity are required' });
        }

        if (!refrigerator) {
            return res.status(404).json({ error: 'Refrigerator not found' });
        }

        if (!refrigerator.foodMap.has(foodName)) {
            return res.status(404).json({ error: 'Food not found in refrigerator or pantry' });
        }

        if(refrigerator.foodMap.get(foodName).location == 'inside') {
            return res.status(404).json({ error: 'Can not manually remove foods inside refrigerator'});
        }

        const quantityToDelete = parseInt(quantity, 10);

        if (isNaN(quantityToDelete) || quantityToDelete <= 0) {
            return res.status(400).json({ error: 'Invalid quantity value' });
        }

        const currentFood = refrigerator.foodMap.get(foodName);

        if (currentFood.quantity <= quantityToDelete) {
            refrigerator.foodMap.delete(foodName);
        } else {
            currentFood.quantity -= quantityToDelete;
            refrigerator.foodMap.set(foodName, currentFood);
        }

        await refrigerator.save();

        res.status(200).json({ message: `${quantityToDelete} of ${foodName} removed successfully`, refrigerator });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

)

router.post('/:id/addFood', async (req, res) => {
    try {
        const { foodName, quantity} = req.body;
        const { id } = req.params;

        if (!foodName || !quantity ) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        // Find the refrigerator by ID
        const refrigerator = await Refrigerator.findById(id);
        if (!refrigerator) {
            return res.status(404).json ({
                message: "Refrigerator not found"
            });
        }

        // Update the foods map with the new food item and its quantity
        // If the food already exists, update the quantity
        if (refrigerator.foodMap.has(foodName)) {

            if(refrigerator.foodMap.get(foodName).location == 'inside') {
                return res.status(404).json({ message: 'Can not manually add foods inside refrigerator'});
            }

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

router.get('/:id/foodMap', async (req, res) => {
    try {
        const refrigerator = await Refrigerator.findById(req.params.id);

        if (!refrigerator) {
            return res.status(404).json({ message: 'Refrigerator not found '})
        }

        res.status(200).json({ foodMap: refrigerator.foodMap });
    } catch (err) {
        res.status(404).json({ error: err.message})
    }
});

router.post('/:id/updateFoodMap', async (req, res) => {
    try {
        const refrigerator = await Refrigerator.findById(req.params.id);

        if (!refrigerator) {
            return res.status(404).json({ message: 'Refrigerator not found '})
        }

        const {insideFood} = req.body; // array of "inside" food

        // remove "inside" food
        const updateFoodMap = Object.entries(refrigerator.foodMap).filter(
            ([foodName])=>!insideFood.includes(foodName));

        const newFoodMap = new Map(updateFoodMap);

        refrigerator.foodMap = newFoodMap;

        await refrigerator.save();

        res.status(200).json({
            message: "Food map updated successfully", foodMap: newFoodMap});


    } catch (error) {
        res.status(500).json({ error: err.message})
    }
});

export default router;