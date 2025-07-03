import {create} from "zustand"


//want backend to provide food, and handle deletion
export const useFoodStore = create((set) => ({
    foodList:[],
    setFoods: (foodList) => set({ foodList}),
    createRefrigerator: async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await fetch("/api/refrigerator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token || ""}`,
                },
                body: JSON.stringify({
                    name: "My Fridge",
                    userIds: [user?._id], // consistant w backend
                    foodMap: {},
                    currentImage: null,
                    pastImage: null
                }),
            });

            const data = await resizeTo.json();
            
            if (!res.ok) {
                return { success: false, message: data.error || "Failed to create refrigerator" };
            }

            return { success: true, refrigeratorId: data._id };
        } catch (error) {
            console.error("Error creating refrigerator:", error);
            return { success: false, message: error.message || "Failed to create refrigerator" };
        }
    },
    createFood: async(newFood) =>{
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.refrigeratorId) {
            return {success: false, message: "User does not have a refrigerator ID"};
        }
        if (!newFood.name || !newFood.quantity) {
            return {success:false, message:"Please give food name (water, apple, carrot)."}
        }
        
        try {
            console.log("Attempting to add food:", newFood);
            const res = await fetch(`/api/refrigerator/${user.refrigeratorId}/addFood`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body:JSON.stringify({
                    foodName: newFood.name,
                    quantity: parseInt(newFood.quantity)
                }),
            });
            
            const data = await res.json();
            console.log("Server response:", data);
            
            if (!res.ok) {
                return {success: false, message: data.error || "Failed to add food"};
            }

            await useFoodStore.getState().fetchFood();
            return {success: true, message: "Food added successfully."};
        } catch (error) {
            console.error("Error adding food:", error);
            return {success: false, message: error.message || "Failed to add food"};
        }
            
        //     // Fetch updated food list
        //     const updatedRes = await fetch("/api/refrigerator/67e8d93a1f1d440ffc1093c7/foodMap");
        //     const updatedData = await updatedRes.json();
        //     console.log("Updated food map:", updatedData);
            
        //     if (!updatedRes.ok) {
        //         return {success: false, message: "Failed to fetch updated food list"};
        //     }
            
        //     // Convert object to array format
        //     const foodList = Object.entries(updatedData.foodMap).map(([name, data]) => ({
        //         name,
        //         quantity: data.quantity
        //     }));
            
        //     set({ foodList });
        //     return { success: true, message: "Food added successfully." };
        // } catch (error) {
        //     console.error("Error adding food:", error);
        //     return {success: false, message: error.message || "Failed to add food"};
        // }
    },
    fetchFood: async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.refrigeratorId) {
            console.warn("No refrigerator ID found.");
            return;
        }
        try {
            const res = await fetch(`/api/refrigerator/${user.refrigeratorId}/foodMap`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const data = await res.json();
            
            if (!res.ok) {
                console.error("Failed to fetch food:", data);
                return;
            }
            
            // Convert object to array format
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