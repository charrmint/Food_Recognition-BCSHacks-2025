import {create} from "zustand"
import { useAuthStore } from '../AuthStore' 
import { api } from '@/api'


//want backend to provide food, and handle deletion
export const useFoodStore = create((set) => ({
    foodList:[],
    setFoods: (foodList) => set({ foodList}),
    createRefrigerator: async () => {
        try {
            const user = useAuthStore.getState().user
            const { data } = await api.post("/refrigerator", {
                userId: user._id,
            });

            return { success: true, refrigeratorId: data._id };
        } catch (error) {
            console.error("Error creating refrigerator:", error);
            return { success: false, message: error.message || "Failed to create refrigerator" };
        }
    },
    createFood: async(newFood) =>{
        const user = useAuthStore.getState().user

        if (!user?.refrigeratorId) {
            return { success: false, message: 'No refrigerator ID found' }
        }
        if (!newFood.name || !newFood.quantity) {
            return {success:false, message:"Please give food name (water, apple, carrot)."}
        }
        
        try {
            console.log("Attempting to add food:", newFood);
            const { data } = await api.post(`/refrigerator/${user.refrigeratorId}/addFood`, {
                foodName: newFood.name,
                quantity: parseInt(newFood.quantity),
            });
            
            console.log("Server response:", data);
            await useFoodStore.getState().fetchFood();
            return {success: true, message: "Food added successfully."};
        } catch (error) {
            console.error("Error adding food:", error);
            return {success: false, message: error.message || "Failed to add food"};
        }
            
    },
    fetchFood: async () => {
        const user = useAuthStore.getState().user
        if (!user?.refrigeratorId) {
            return { success: false, message: 'No refrigerator ID found' }
        }
        try {
            const { data } = await api.get(`/refrigerator/${user.refrigeratorId}/foodMap`)

            const foodList = Object.entries(data.foodMap).map(([name, val]) => ({
                name,
                quantity: val.quantity
            }));
            console.log("Foodlist:", foodList);
            
            set({ foodList });
        } catch (error) {
            console.error("Error fetching food:", error);
        }
    },
    removeFood: async ({ foodName, quantity }) => {
        const user = useAuthStore.getState().user

        if (!user?.refrigeratorId) {
            return { success: false, message: 'No refrigerator ID found' }
        }

        if (!foodName || !quantity) {
            return { success: false, message: 'Food name and quantity are required' }
        }

        try {
            await api.delete(`/refrigerator/${user.refrigeratorId}/removeFoods`, {
                data: { foodName, quantity: parseInt(quantity) }
            })

            await useFoodStore.getState().fetchFood()
            return { success: true }
        } catch (error) {
            console.error('Error removing food:', error)
            return { 
                success: false, 
                message: error.response?.data?.error || 'Failed to remove food' 
            }
        }
    },
    updateFoodMap: async (foodMap) => {
        const user = useAuthStore.getState().user
        
        if (!user?.refrigeratorId) {
            return { success: false, message: 'No refrigerator ID found' }
        }
        
        try {
            await api.post(`/refrigerator/${user.refrigeratorId}/updateFoodMap`, {
                foodMap
            })
            
            await useFoodStore.getState().fetchFood()
            return { success: true }
        } catch (error) {
            console.error('Error updating food map:', error)
            return { 
                success: false, 
                message: error.response?.data?.error || 'Failed to update food map' 
            }
        }
    },
}));