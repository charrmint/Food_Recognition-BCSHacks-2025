import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import FoodCard from '@/components/FoodCard'
import { messages } from './messages'

export const InventoryView = ({ foodList }) => {
    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize="30"
                    fontWeight="bold"
                    bgGradient="linear(to-r, cyan.400, blue.500)"
                    bgClip="text"
                    textAlign="center"
                >
                    {messages.inventoryTitle}
                </Text>

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={4}
                    w="full"
                    maxW="600px"
                >
                    {foodList.length > 0 ? (
                        foodList.map((food) => (
                            <FoodCard key={food._id} food={food} />
                        ))
                    ) : (
                        <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                            {messages.noFoods}
                        </Text>
                    )}
                </SimpleGrid>
            </VStack>
        </Container>
    )
}