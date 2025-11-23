import {Box, Container, Heading, useColorModeValue, useToast, VStack, Input, Button} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import { useFoodStore } from '../store/FoodStore/food';

//needs to interact with backend to be able to addFoods
const AskPage = () => {
    const [newQuestion, setNewQuestion] = useState({
        question: "",
    });
    const {fetchFood, foodList} = useFoodStore();

    useEffect(() => {
        fetchFood();
    },
    [fetchFood]);


    //const { createFood } = useFoodStore();
    const toast = useToast();

    const handleAsk = async () => {
        const question = newQuestion.question.trim().toLowerCase();

        if (!question) return; // ignore blank

        // iterate over foodList
        const foundFood = foodList?.find(food => food.name.toLowerCase() === question);
        if (foundFood) {
                toast({
                    title: `${foundFood.quantity}`,
                    description: `You have ${foundFood.quantity} ${foundFood.name}(s).`,
                    status: 'success',
                    isClosable: true,
                });

                // Reset form after success
                setNewQuestion({ question: '' });
            } else {
                toast({
                    title: '0',
                    description: `You do not have ${question} in your fridge`,
                    status: 'error',
                    isClosable: true,
                });
            }
    };

    return (
        <Container maxW="container.sm">
            <VStack spacing={12}>
                <Heading as="h1" size="md" textAlign="center" mb={4}>
                    "How many __ do I have?"
                </Heading>

                <Box
                    w="300px"
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded="lg"
                    shadow="md"
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Enter food name"
                            value={newQuestion.question}
                            onChange={(e) => setNewQuestion({ question: e.target.value })}
                            size="lg"
                            h="50px"
                        />

                        <Button colorScheme="blue" onClick={handleAsk} w="full"mt={2}>
                            Ask
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default AskPage;