import { useState, useRef, useCallback } from 'react'
import { useToast } from '@chakra-ui/react'
import { useFoodStore } from '@/store/FoodStore/food'
import { api } from '@/api'
import { messages } from '../views/messages'

export const useScanFood = () => {
    const [cameraEnabled, setCameraEnabled] = useState(false)  // OFF by default
    const [imgSrc, setImgSrc] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [detectedFoods, setDetectedFoods] = useState([])
    const webcamRef = useRef(null)

    const updateFoodMap = useFoodStore((state) => state.updateFoodMap)
    const toast = useToast()

    const toggleCamera = () => {
        setCameraEnabled((prev) => !prev)
        if (cameraEnabled) {
            setImgSrc(null)
            setDetectedFoods([])
        }
    }

    const capture = useCallback(async () => {
        if (!webcamRef.current) return

        const imageSrc = webcamRef.current.getScreenshot()
        setImgSrc(imageSrc)
        setIsProcessing(true)
        setDetectedFoods([])

        try {
            const { data } = await api.post('/scan', { image: imageSrc })

            if (data.success && data.foods?.length > 0) {
                setDetectedFoods(data.foods)
                
                const foodMap = {}
                data.foods.forEach(foodName => {
                    foodMap[foodName] = {
                        quantity: 1,
                        location: 'inside'
                    }
                })

                const result = await updateFoodMap(foodMap)

                if (result.success) {
                    toast({
                        title: messages.toastSuccess,
                        description: messages.scanSuccess(data.foods.length),
                        status: 'success',
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: messages.toastError,
                        description: result.message || messages.updateFailed,
                        status: 'error',
                        isClosable: true,
                    })
                }
            } else {
                toast({
                    title: messages.toastWarning,
                    description: messages.noFoodsDetected,
                    status: 'warning',
                    isClosable: true,
                })
            }
        } catch (error) {
            console.error('Error processing image:', error)
            toast({
                title: messages.toastError,
                description: error.response?.data?.error || messages.processingFailed,
                status: 'error',
                isClosable: true,
            })
        } finally {
            setIsProcessing(false)
        }
    }, [updateFoodMap, toast])

    const clearCapture = () => {
        setImgSrc(null)
        setDetectedFoods([])
    }

    return {
        cameraEnabled,
        toggleCamera,
        webcamRef,
        imgSrc,
        isProcessing,
        detectedFoods,
        capture,
        clearCapture,
    }
}