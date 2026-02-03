import { Box, Input, Button, VStack, Text, useColorModeValue } from '@chakra-ui/react'
import { messages } from './messages'

export const AskFoodView = ({
    query,
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
                    placeholder={messages.queryPlaceholder}
                    value={query}
                    onChange={handleInputChange}
                    size="sm"
                />
                <Button
                    colorScheme="blue"
                    onClick={handleSubmit}
                    w="full"
                    size="sm"
                >
                    {messages.submitButton}
                </Button>
            </VStack>
        </Box>
    )
}