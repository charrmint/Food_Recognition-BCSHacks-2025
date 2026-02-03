import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/AuthStore'
import { useToast } from '@chakra-ui/react'
import { messages } from '../views/messages'

export const useDashboard = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const logout = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.user)

    const handleLogout = () => {
        localStorage.removeItem('token')
        logout()
        toast({
            title: messages.toastLogout,
            status: 'info',
            isClosable: true,
        })
        navigate('/auth')
    }

    return {
        user,
        handleLogout,
    }
}