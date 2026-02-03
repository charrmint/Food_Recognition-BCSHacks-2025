import { useEffect } from "react"
import { useFoodStore } from "@/store/FoodStore/food"

export const useInventory = () => {
    const fetchFood = useFoodStore((state) => state.fetchFood)
    const foodList = useFoodStore((state) => state.foodList)

    useEffect(() => {
        fetchFood()
    }, [fetchFood])

    return {
        foodList,
    }
}