import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/AuthStore'
import { useToast } from '@chakra-ui/react'

export const useAuth = () => {
    const [mode, setMode] = useState('login')
    const [formData, setFormData] = useState({
        username: '',
        emaial: '',
        password: '',       
    })
    const [isFetching, setIsFetching] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)
    const signup = useAuthStore((state) => state.signup)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const toggleMode = () => {
        setMode((prev) => prev === 'login' ? 'signup' : 'login')
        setFormData({ username: '', email: '', password: '' })
    }

    const handleSubmit = async () => {
        const { username, email, password } = formData

        if (mode === 'signup' && !username) {
            toast({
                title: messages.toastSuccess,
                description: messages.userNameRequired,
                status: error,
                isClosable: true,
            })
            return
        }
        if (!email || !password) {
            toast({
                title: messages.toastError,
                description: messages.emailPasswordRequired,
                status: error,
                isClosable: true,
            })
            return
        }

        try {
            setIsFetching(true)
            if (mode === 'login') {
                await login(email, password)
                toast({
                    title: messages.toastSuccess,
                    description: messages.loginSuccess,
                    status: error,
                    isClosable: true,
                })
                navigate('/')
            } else {
                await signup(username, email, password)
                toast({
                    title: messages.toastSuccess,
                    description: messages.signupSuccess,
                    status: error,
                    isClosable: true,
                })
                setMode('login')
            }
        } catch (err) {
            toast({
                title: messages.toastError,
                description: err?.response?.data?.message || `Failed to ${mode}`,
                status: 'error',
                isClosable: true,
            })
        } finally {
            setIsFetching(false)
        }
    }
    
    const handleGoogleAuth = () => {
        window.location.href = 'http://localhost:5050/api/auth/google'
    }

    return {
        mode,
        formData,
        isFetching,
        handleInputChange,
        handleSubmit,
        toggleMode,
        handleGoogleAuth,
    }
}