import { Box, Input, Button, VStack, Text, useColorModeValue } from '@chakra-ui/react'
import { messages } from './messages'

export const RemoveFoodView = ({
    formData,
    isSubmitting,
    handleInputChange,
    handleSubmit,
}) => {
    const bgColor = useColorModeValue('white', 'gray.800')

    return (
        <Box w="full" bg={bgColor} p={4} rounded="lg" shadow="md">
            <VStack spacing={3}>
                <Text fontWeight="bold" fontSize="lg">
                    {messages.header}
                </Text>
                <Input
                    placeholder={messages.namePlaceholder}
                    name="foodName"
                    value={formData.foodName}
                    onChange={handleInputChange}
                    size="sm"
                />
                <Input
                    placeholder={messages.quantityPlaceholder}
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    size="sm"
                />
                <Button
                    colorScheme="blue"
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    w="full"
                    size="sm"
                >
                    {messages.submitButton}
                </Button>
            </VStack>
        </Box>
    )
}