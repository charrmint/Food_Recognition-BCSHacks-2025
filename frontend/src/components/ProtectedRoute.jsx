import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/AuthStore'
import { Spinner, Center } from '@chakra-ui/react'

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user)
  const loadingUser = useAuthStore((state) => state.loadingUser)

  if (loadingUser) {
    return (
        <Center h="100vh">
            <Spinner size="xl" />
        </Center>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return children
}

export default ProtectedRoute