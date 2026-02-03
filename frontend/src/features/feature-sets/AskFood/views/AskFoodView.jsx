import { Box, Container, Heading, Input, Button, VStack, useColorModeValue } from '@chakra-ui/react'
import { messages } from './messages'

export const AskFoodView = ({
    query,
    handleInputChange,
    handleSubmit,
}) => {
    const bgColor = useColorModeValue('white', 'gray.800')

    return (
        <Container maxW="container.sm">
            <VStack spacing={12}>
                <Heading as="h1" size="md" textAlign="center" mb={4}>
                    {messages.header}
                </Heading>

                <Box w="300px" bg={bgColor} p={6} rounded="lg" shadow="md">
                    <VStack spacing={4}>
                        <Input
                            placeholder={messages.queryPlaceholder}
                            value={query}
                            onChange={handleInputChange}
                            size="lg"
                            h="50px"
                        />
                        <Button
                            colorScheme="blue"
                            onClick={handleSubmit}
                            w="full"
                            mt={2}
                        >
                            {messages.submitButton}
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}