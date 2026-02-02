import { Box, Container, Heading, Input, Button, VStack, Text, Divider, useColorModeValue } from '@chakra-ui/react'
import { messages } from './messages'

export const AuthPageView = ({
    mode,
    formData,
    isFetching,
    handleInputChange,
    handleSubmit,
    toggleMode,
    handleGoogleAuth,
}) => {
    const bgColor = useColorModeValue('white', 'gray.800')
    const isLogin = mode === 'login'

    return (
        <Container maxW="container.sm" py={12}>
            <VStack spacing={8}>
                <Heading as="h1" size="2xl" textAlign="center">
                    {isLogin ? messages.loginHeader : messages.signupHeader}
                </Heading>

                <Box w="full" maxW="400px" bg={bgColor} p={8} rounded="lg" shadow="md">
                    <VStack spacing={4}>
                        {!isLogin && (
                            <Input
                                placeholder={messages.usernamePlaceholder}
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        )}
                        <Input
                            placeholder={messages.emailPlaceholder}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder={messages.passwordPlaceholder}
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <Button
                            colorScheme="blue"
                            onClick={handleSubmit}
                            isLoading={isFetching}
                            w="full"
                        >
                            {isLogin ? messages.loginButton : messages.signupButton}
                        </Button>

                        <Divider />

                        <Button
                            variant="outline"
                            onClick={handleGoogleAuth}
                            w="full"
                            leftIcon={<GoogleIcon />}
                        >
                            {messages.googleButton}
                        </Button>

                        <Text
                            fontSize="sm"
                            color="blue.500"
                            cursor="pointer"
                            onClick={toggleMode}
                            _hover={{ textDecoration: 'underline' }}
                        >
                            {isLogin ? messages.switchToSignup : messages.switchToLogin}
                        </Text>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
    </svg>
)