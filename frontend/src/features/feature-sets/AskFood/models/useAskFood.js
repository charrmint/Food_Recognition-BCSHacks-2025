import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useFoodStore } from '@/store/FoodStore/food'
import { messages } from '../views/messages'

export const useAskFood = () => {
    const [query, setQuery] = useState('')

    const fetchFood = useFoodStore((state) => state.fetchFood)
    const foodList = useFoodStore((state) => state.foodList)
    const toast = useToast()

    useEffect(() => {
        fetchFood()
    }, [fetchFood])

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = () => {
        const searchTerm = query.trim().toLowerCase()

        if (!searchTerm) return

        const foundFood = foodList?.find(
            (food) => food.name.toLowerCase() === searchTerm
        )

        if (foundFood) {
            toast({
                title: `${foundFood.quantity}`,
                description: messages.foundDescription(foundFood.quantity, foundFood.name),
                status: 'success',
                isClosable: true,
            })
        } else {
            toast({
                title: '0',
                description: messages.notFoundDescription(searchTerm),
                status: 'error',
                isClosable: true,
            })
        }
    }

    return {
        query,
        handleInputChange,
        handleSubmit,
    }
}