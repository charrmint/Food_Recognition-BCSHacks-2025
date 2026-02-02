import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '@/store/AuthStore'
import { Spinner, Center } from '@chakra-ui/react'

const OAuthCallbackPresenter = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const fetchMe = useAuthStore((state) => state.fetchMe)

    useEffect(() => {
        const token = searchParams.get('token')
        if (token) {
            localStorage.setItem('token', token)
            fetchMe().then(() => navigate('/'))
        } else {
            navigate('/auth')
        }
    }, [searchParams, navigate, fetchMe])

    return (
        <Center h="100vh">
            <Spinner size="xl" />
        </Center>
    )
}

export default OAuthCallbackPresenter