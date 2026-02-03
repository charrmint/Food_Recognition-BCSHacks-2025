import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import FoodCard from '@/components/FoodCard'
import { messages } from './messages'

export const InventoryView = ({ foodList }) => {
    return (
        <Box>
            <VStack spacing={4}>
                <Text
                    fontSize="24"
                    fontWeight="bold"
                    bgGradient="linear(to-r, cyan.400, blue.500)"
                    bgClip="text"
                    textAlign="center"
                >
                    {messages.inventoryTitle}
                </Text>

                <SimpleGrid
                    columns={{ base: 2, md: 3, lg: 4 }}
                    spacing={2}
                    w="full"
                >
                    {foodList.length > 0 ? (
                        foodList.map((food) => (
                            <FoodCard key={food._id} food={food} />
                        ))
                    ) : (
                        <Text fontSize="md" textAlign="center" fontWeight="bold" color="gray.500">
                            {messages.noFoods}
                        </Text>
                    )}
                </SimpleGrid>
            </VStack>
        </Box>
    )
}