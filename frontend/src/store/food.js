import {create} from "zustand"


//want backend to provide food, and handle deletion
export const useFoodStore = create((set) => ({
    foodList:[{
        "name": "apple",
        "quantity": 1
      },{"name": "cake",
        "quantity": 2
      }],
    setFoods: (foodList) => set({ foodList}),
    createFood: async(newFood) =>{
        if (!newFood.name || !newFood.quantity) {
            return {success:false, message:"Please give food name (water, apple, carrot)."}
        }
        const res = await fetch("/api/refrigerator", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newFood),
        }); //huh do not understand this part
        const data= await res.json();
        //interacts w back end
        const updatedRes = await fetch("/api/refrigerator");
        const updatedData = await updatedRes.json();
    
        set({ foodList: updatedData.data });

        return { success: true, message: "Food made successfully." };
    },
    fetchFood: async () => {
        const res = await fetch("/api/refrigerator");
        const data = await res.json();
        set({ foodList: data.data });
    }
}));