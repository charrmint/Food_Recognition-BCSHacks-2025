import {create} from "zustand"


//want backend to provide food, and handle deletion
export const useFoodStore = create((set) => ({
    foodList:[],
    setFoods: (foodList) => set({ foodList}),
    createRefrigerator: async () => {
        try {
            const res = await fetch("/api/refrigerator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "My Fridge",
                    userIds: [], // consistant w backend
                    foodMap: {},
                    currentImage: null,
                    pastImage: null
                }),
            });
            
            if (!res.ok) {
                const data = await res.json();
                return { success: false, message: data.error || "Failed to create refrigerator" };
            }
            
            const data = await res.json();
            return { success: true, refrigeratorId: data._id };
        } catch (error) {
            console.error("Error creating refrigerator:", error);
            return { success: false, message: error.message || "Failed to create refrigerator" };
        }
    },
    createFood: async(newFood) =>{
        if (!newFood.name || !newFood.quantity) {
            return {success:false, message:"Please give food name (water, apple, carrot)."}
        }
        
        try {
            console.log("Attempting to add food:", newFood);
            const res = await fetch("/api/refrigerator/67e8d93a1f1d440ffc1093c7/addFood", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    foodName: newFood.name,
                    quantity: parseInt(newFood.quantity)
                }),
            });
            
            const data = await res.json();
            console.log("Server response:", data);
            
            if (!res.ok) {
                if (res.status === 404) {
                    // If refrigerator not found, try to create one
                    const createResult = await useFoodStore.getState().createRefrigerator();
                    if (!createResult.success) {
                        return { success: false, message: "Failed to create refrigerator" };
                    }
                    // Retry adding food with the new refrigerator ID
                    return await useFoodStore.getState().createFood(newFood);
                }
                return {success: false, message: data.error || data.message || "Failed to add food"};
            }
            
            // Fetch updated food list
            const updatedRes = await fetch("/api/refrigerator/67e8d93a1f1d440ffc1093c7/foodMap");
            const updatedData = await updatedRes.json();
            console.log("Updated food map:", updatedData);
            
            if (!updatedRes.ok) {
                return {success: false, message: "Failed to fetch updated food list"};
            }
            
            // Convert object to array format
            const foodList = Object.entries(updatedData.foodMap).map(([name, data]) => ({
                name,
                quantity: data.quantity
            }));
            
            set({ foodList });
            return { success: true, message: "Food added successfully." };
        } catch (error) {
            console.error("Error adding food:", error);
            return {success: false, message: error.message || "Failed to add food"};
        }
    },
    fetchFood: async () => {
        try {
            const res = await fetch("/api/refrigerator/67e8d93a1f1d440ffc1093c7/foodMap");
            const data = await res.json();
            
            if (!res.ok) {
                console.error("Failed to fetch food:", data);
                return;
            }
            
            // Convert object to array format
            const foodList = Object.entries(data.foodMap).map(([name, data]) => ({
                name,
                quantity: data.quantity
            }));
            console.log("Foodlist:", foodList);
            
            set({ foodList });
        } catch (error) {
            console.error("Error fetching food:", error);
        }
    }
}));