import {create} from "zustand"

export const useFoodStore = create((set) => ({
    foods:[],
    setFoods: (foods) => set({ foods}),
    createFood: async(newFood) =>{
        if (!newFood.name) {
            return {success:false, message:"Please give food name (water, apple, carrot)."}
        }
        const res = await fetch("/api/foods", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newFood),
        }); //huh do not understand this part
        const data= await res.json();
        set((state) => ({foods:[...state.foods,data.data] }));
        return {success:true, message:"Food made successfully."};
        //interacts w back end
    },
    fetchFood: async () => {
        const res = await fetch("/api/foods");
        const data = await res.json();
        set({ foods: data.data });
    }
}));