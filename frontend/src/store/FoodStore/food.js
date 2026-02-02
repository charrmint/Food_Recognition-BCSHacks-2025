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
            return {success: false, message: "User does not have a refrigerator ID"};
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
            console.warn("No refrigerator ID found.");
            return;
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
}));