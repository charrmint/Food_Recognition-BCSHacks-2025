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
  
router.post('/:id/updateFoodMap', async (req, res) => {
    try {
        const { id } = req.params;
        const inputFoodObject = req.body.foodMap; // Input is likely a plain JS Object from JSON

        // --- Input Validation (Recommended) ---
        if (!inputFoodObject || typeof inputFoodObject !== 'object' || Array.isArray(inputFoodObject)) {
             return res.status(400).json({ error: 'Invalid foodMap format in request body. Expected an object.' });
        }
        // --- End Input Validation ---

        console.log("Received foodMap object from request:", inputFoodObject);

        // Find the refrigerator by ID
        const refrigerator = await Refrigerator.findById(id);

        if (!refrigerator) {
            return res.status(404).json({ error: 'Refrigerator not found' });
        }

        // Get the current foodMap (Mongoose should provide this as a Map)
        const currentFoodMap = refrigerator.foodMap; // This should be a JS Map

        // --- Verification (Optional Debugging) ---
        if (!(currentFoodMap instanceof Map)) {
            console.warn('Warning: refrigerator.foodMap was not initially a Map instance. Type:', typeof currentFoodMap);
            // Handle potential edge case if it's somehow stored differently, though unlikely with a Map schema type
            // You might need to convert it here if it's not a map:
            // currentFoodMap = new Map(Object.entries(currentFoodMap || {}));
        }
        // --- End Verification ---

        // Create the new Map for the result
        const mergedMap = new Map();

        // 1. Add items from the CURRENT map ONLY if their location is NOT 'inside'
        currentFoodMap.forEach((value, key) => {
            // Ensure value has a location property before accessing it
            if (value && value.location !== 'inside') {
                mergedMap.set(key, value);
            }
        });

        console.log("Map after filtering out 'inside' items:", Object.fromEntries(mergedMap)); // Log as object for readability

        // 2. Add/Overwrite items from the INPUT object (these are assumed to be the new 'inside' items)
        // The inputFoodObject is a plain JS object, so iterate its entries
        for (const [key, value] of Object.entries(inputFoodObject)) {
            // You might want to add validation here to ensure input items *do* have location: 'inside'
            // if (value && value.location === 'inside') { // Example validation
                 mergedMap.set(key, value);
            // } else {
            //    console.warn(`Item '${key}' from input ignored because its location was not 'inside' (or missing location).`);
            //}
        }

        console.log("Map after merging input items:", Object.fromEntries(mergedMap)); // Log as object for readability

        // Assign the final JavaScript Map back to the Mongoose document field
        refrigerator.foodMap = mergedMap;

        // Save the updated refrigerator
        await refrigerator.save();

        // Respond with the updated foodMap (convert back to Object for JSON)
        res.status(200).json({
            message: 'Food map updated successfully',
            foodMap: Object.fromEntries(mergedMap) // Convert Map to Object for JSON response
        });

    } catch (error) {
        console.error('Error updating foodMap:', error);
        // Check specifically for validation errors vs other errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error while updating food map.' }); // Use 500 for server errors
    }
});


export default router;