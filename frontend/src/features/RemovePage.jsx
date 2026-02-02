import {Box, Container, Heading, useColorModeValue, useToast, VStack, Input, Button} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/AuthStore';
import { api } from '@/api';

//needs to interact with backend to be able to addFoods
const RemovePage = () => {
    const [foodToRemove, setNewFood] = useState({
        foodName: "",
        quantity: "",
    });

    const [foodMap, setFoodMap] = useState(new Map());
    const toast = useToast();

    const fetchFoodMap = async () => {
        const user = useAuthStore.getState().user
        const refrigeratorId = user?.refrigeratorId;
        if (!refrigeratorId) {
            console.warn("No refrigerator ID found.");
            return;
        }
        try {
            const { data } = await api.get(`/refrigerator/${refrigeratorId}/foodMap`)
            const foodData = data.foodMap
            const map = new Map(Object.entries(foodData));
            setFoodMap(map);
        } catch (error) {
            console.error('Error fetching food map:', error);
        }
    }

    useEffect(() => {
        fetchFoodMap();
    }, []);

    const handleRemoveFood = async () => {
        const { foodName, quantity } = foodToRemove;
        const user = useAuthStore.getState().user
        const refrigeratorId = user?.refrigeratorId;
        console.log("Removing food:", foodToRemove);
        if (!refrigeratorId) {
            toast({
                title: 'Error',
                description: 'No refrigerator ID found.',
                status: 'error',
                isClosable: true,
            });
            return;
        }

        if (!foodName || !quantity) {
            toast({
                title: 'Error',
                description: 'Food name and quantity are required.',
                status: 'error',
                isClosable: true,
            });
            return;
        }
        
        if (!foodMap.has(foodName)) {
            toast({
                title: 'Error',
                description: 'Food is not in refrigerator.',
                status: 'error',
                isClosable: true,
            });
            return;
        }

        try {
            const response = await api.delete(`/refrigerator/${refrigeratorId}/removeFoods`, {
                data: { foodName, quantity }
            })

            if (response.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Food removed successfully.',
                    status: 'success',
                    isClosable: true,
                })
                setNewFood({ foodName: '', quantity: '' });
                fetchFoodMap()
            } else {
                toast({
                    title: 'Error',
                    description: `Failed to remove food. Status: ${response.status}`,
                    status: 'error',
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error removing food:', error);
            
            if (error.response) {
                console.error('Error response:', error.response);
                toast({
                    title: 'Error',
                    description: `API Error: ${error.response.data.error}`,
                    status: 'error',
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Something went wrong.',
                    status: 'error',
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Container maxW="container.sm">
            <VStack spacing={12}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    Remove food
                </Heading>

                <Box
                    w="300px" bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={10}>
                        <Input
                            placeholder='Food name'
                            value={foodToRemove.foodName}
                            onChange={(e) => setNewFood({ ...foodToRemove, foodName: e.target.value })}
                        />
                        <Input
                            placeholder='Quantity' 
                            type='number'
                            value={foodToRemove.quantity}
                            onChange={(e) => setNewFood({ ...foodToRemove, quantity: e.target.value })}
                        />

                        <Button type="button" colorScheme="blue" onClick={() =>{
                            console.log('Button clicked');
                            handleRemoveFood();
                        }} w="full">
                            Remove Food
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
    
};

export default RemovePage;
