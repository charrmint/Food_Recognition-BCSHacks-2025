import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useFoodStore } from '@/store/FoodStore/food'
import { messages } from '../views/messages'

export const useRemoveFood = () => {
    const [formData, setFormData] = useState({
        foodName: '',
        quantity: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const removeFood = useFoodStore((state) => state.removeFood)
    const toast = useToast()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]:value }))
    }

    const handleSubmit = async () => {
        const { foodName, quantity } = formData

        if (!foodName || !quantity) {
            toast({
                title: messages.toastError,
                description: messages.nameQuantityRequired,
                status: 'error',
                isClosable: true,
            })
            return
        }

        try {
            setIsSubmitting(true)
            const result = await removeFood({ foodName, quantity })

            if (result.success) {
                toast({
                    title: messages.toastSuccess,
                    description: messages.removeSuccess,
                    status: 'success',
                    isClosable: true,
                })
                setFormData({ foodName: '', quantity: '' })
            } else {
                toast({
                    title: messages.toastError,
                    description: result.message || messages.removeFailed,
                    status: 'error',
                    isClosable: true,
                })
            }
        } catch (error) {
            console.error('Error removing food:', error)
            toast({
                title: messages.toastError,
                description: messages.somethingWentWrong,
                status: 'error',
                isClosable: true,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formData,
        isSubmitting,
        handleInputChange,
        handleSubmit,
    }
}