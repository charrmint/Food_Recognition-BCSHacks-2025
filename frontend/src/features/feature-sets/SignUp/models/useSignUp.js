import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/AuthStore'
import { useToast } from '@chakra-ui/react'

export const useSignUp = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [isFetching, setIsFetching] = useState(false)
    
    const toast = useToast()
    const navigate = useNavigate()
    const signup = useAuthStore((a) => a.signup)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserDetails((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        const { username, email, password } = userDetails;

        if (!username || !email || !password) {
            toast({
                title: "Error",
                description: "All fields are required.",
                status: "error",
                isClosable: true,
            })
            return
        }

        try {
            setIsFetching(true)
            await signup(username, email, password)
            toast({
                title: 'Success',
                description: 'User added succesfully',
                status: 'success',
                isClosable: true,
            })
            
            navigate(`/login`);
        } catch (err) {
            toast({
                title: 'Error',
                description: err?.response?.data?.error || 'Failed to sign up',
                status: 'error',
                isClosable: true,
            })
        } finally {
            setIsFetching(false)
        }
    }

    return {
        userDetails,
        handleInputChange,
        handleSubmit,
        isFetching,
    }
}


