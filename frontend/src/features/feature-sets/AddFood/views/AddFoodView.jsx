import { Box, Container, Heading, Input, Button, VStack, useColorModeValue } from '@chakra-ui/react'
import { messages } from './messages'

export const AddFoodView = ({
    formData,
    isSubmitting,
    handleInputChange,
    handleSubmit,
}) => {
    const bgColor = useColorModeValue('white', 'gray.800')

    return (
        <Container maxW="container.sm">
            <VStack spacing={12}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    {messages.header}
                </Heading>

                <Box w="300px" bg={bgColor} p={6} rounded="lg" shadow="md">
                    <VStack spacing={10}>
                        <Input
                            placeholder={messages.namePlaceholder}
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder={messages.quantityPlaceholder}
                            name="quantity"
                            type="number"
                            value={formData.quantity}
                            onChange={handleInputChange}
                        />
                        <Button
                            colorScheme="blue"
                            onClick={handleSubmit}
                            isLoading={isSubmitting}
                            w="full"
                        >
                            {messages.submitButton}
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}