import express from 'express'
import User from '../models/User.js';
import { protect, checkRefrigeratorAccess } from '../middleware/authMiddleware.js';
import createRefrigeratorForUser from '../utils/createRefrigeratorForUser.js';

const router = express.Router();

// create refrigerator
router.post('/', protect, async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.find({ '_id': { $in: userId } });

        const refrigerator = await createRefrigeratorForUser(user);

        await refrigerator.save();
        return res.status(201).json(refrigerator);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// get refrigerator, assigned users, and assigned foods
router.get('/:id', protect, checkRefrigeratorAccess, async (req, res) => {
    try {
        await req.refrigerator.populate('userList');
        return res.status(200).json(req.refrigerator);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// remove user
router.put('/:id/removeUser', protect, checkRefrigeratorAccess, async (req, res) => {
    try {
        const { userId } = req.body;
        const refrigerator = req.refrigerator;

        refrigerator.userList = refrigerator.userList.filter(user => user.toString() !== userId);

        await refrigerator.save();

        return res.status(200).json({ message: 'User removed succesfully', refrigerator });
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
});

// remove foods
router.delete('/:id/removeFoods', protect, checkRefrigeratorAccess, async (req, res) => {
    try {
        const { foodName, quantity } = req.body;
        const refrigerator = req.refrigerator;

        // TODO: transfer functionality to frontend
        if (!foodName || !quantity) {
            return res.status(400).json({ error: 'Food name and quantity are required' });
        }

        if (!refrigerator.foodMap.has(foodName)) {
            return res.status(404).json({ error: 'Food not found in refrigerator or pantry' });
        }

        if(refrigerator.foodMap.get(foodName).location == 'inside') {
            return res.status(404).json({ error: 'Can not manually remove foods inside refrigerator'});
        }

        const quantityToDelete = parseInt(quantity, 10);

        // TODO: transfer functionality to frontend
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

        return res.status(200).json({ message: `${quantityToDelete} of ${foodName} removed successfully`, refrigerator });
    } catch(err) {
        return res.status(400).json({ error: err.message });
    }
})

// add foods
router.post('/:id/addFood', protect, checkRefrigeratorAccess, async (req, res) => {
    try {
        const { foodName, quantity} = req.body;
        const refrigerator = req.refrigerator;

        if (!foodName || !quantity ) {
            return res.status(400).json({
                error: 'All fields are required'
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
        return res.status(201).json({
            message: "Food added successfully", refrigerator
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }

});

router.get('/:id/foodMap', protect, checkRefrigeratorAccess, async (req, res) => {
    try {
        const refrigerator = req.refrigerator;
        return res.status(200).json({ foodMap: refrigerator.foodMap });
    } catch (err) {
        return res.status(404).json({ error: err.message})
    }
});

// router.post('/:id/updateFoodMap', async (req, res) => {
//     try {

//         console.log("Something");
//       const { id } = req.params;
//       const { foodMap } = req.body; // Input foodMap from the request body

//       console.log(foodMap);
  
//       // Find the refrigerator by ID
//       const refrigerator = await Refrigerator.findById(id);
  
//       if (!refrigerator) {
//         return res.status(404).json({ error: 'Refrigerator not found' });
//       }
  
//       // Get access to the current foodmap
//       let currentFoodMap = refrigerator.foodMap
  
//       // Filter the existing foodMap to remove foods with location 'inside'
//       const filteredFoodMap = Object.fromEntries(
//         Object.entries(currentFoodMap).filter(([foodName]) => foodName.location !== 'inside')
//       );

//       const newFoodMapResult = Object.fromEntries(Object.entries(foodMap));
  
//       // Merge the filtered foodMap with the newFoodMap from the request
//       const mergedFoodMap = { ...filteredFoodMap, ...newFoodMapResult };
  
//       // Assign the merged foodMap to the refrigerator's foodMap
//       refrigerator.foodMap = mergedFoodMap;
  
//       // Save the updated refrigerator
//       await refrigerator.save();
  
//       // Respond with the updated foodMap
//       res.status(200).json({ message: 'Food map updated successfully', foodMap: mergedFoodMap });
  
//     } catch (error) {
//       console.error('Error updating foodMap:', error);
//       res.status(404).json({ error: error.message });
//     }
//   });
  
router.post('/:id/updateFoodMap', protect, checkRefrigeratorAccess, async (req, res) => {
    try {
        const inputFoodObject = req.body.foodMap;
        const refrigerator = req.refrigerator;

        if (!inputFoodObject || typeof inputFoodObject !== 'object' || Array.isArray(inputFoodObject)) {
             return res.status(400).json({ error: 'Invalid foodMap format in request body. Expected an object.' });
        }

        console.log("Received foodMap object from request:", inputFoodObject);

        const currentFoodMap = refrigerator.foodMap; // This should be a JS Map
  
        if (!(currentFoodMap instanceof Map)) {
            console.warn('Warning: refrigerator.foodMap was not initially a Map instance. Type:', typeof currentFoodMap);
        }

        const mergedMap = new Map();

        currentFoodMap.forEach((value, key) => {
            // Ensure value has a location property before accessing it
            if (value && value.location !== 'inside') {
                mergedMap.set(key, value);
            }
        });

        console.log("Map after filtering out 'inside' items:", Object.fromEntries(mergedMap));

        for (const [key, value] of Object.entries(inputFoodObject)) {
                 mergedMap.set(key, value);
        }

        console.log("Map after merging input items:", Object.fromEntries(mergedMap));

        refrigerator.foodMap = mergedMap;

        await refrigerator.save();


        return res.status(200).json({
            message: 'Food map updated successfully',
            foodMap: Object.fromEntries(mergedMap) 
        });

    } catch (error) {
        console.error('Error updating foodMap:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error while updating food map.' }); 
    }
});

export default router;