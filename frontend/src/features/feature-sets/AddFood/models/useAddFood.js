import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useFoodStore } from '@/store/FoodStore/food'
import { messages } from '../views/messages'

export const useAddFood = () => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const createFood = useFoodStore((state) => state.createFood)
    const toast = useToast()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async() => {
        const { name, quantity } = formData

        if (!name || !quantity) {
            toast({
                title: messages.toastError,
                description: messages.nameQuantityRequired,
                status:'error',
                isClosable: true,
            })
            return
        }

        try {
            setIsSubmitting(true)
            const result = await createFood({ name, quantity: parseInt(quantity) })

            if (result.success) {
                toast({
                    title: messages.toastSuccess,
                    description: messages.addSuccess,
                    status: 'success',
                    isClosable: true,
                })
                setFormData({ name: '', quantity: '' })
            } else {
                toast({
                    title: messages.toastError,
                    description: result.message || messages.addFailed,
                    status: 'error',
                    isClosable: true,
                })
            }
        } catch (error) {
            console.error('Error adding food:', error)
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
        handleSubmit
    }
}