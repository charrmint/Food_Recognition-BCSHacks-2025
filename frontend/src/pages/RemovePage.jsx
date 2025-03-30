import {Box, Container, Heading, useColorModeValue, useToast, VStack, Input, Button} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import axios from 'axios';
//let refrigerator_id_here = 1;

//needs to interact with backend to be able to addFoods
const RemovePage = () => {
    const [newFood, setNewFood] = useState({
        foodName: "",
        quantity: "",
    });

    const [foodMap, setFoodMap] = useState(new Map());
    const toast = useToast();

    useEffect(() => {
        const fetchFoodMap = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/api/refrigerator/67e8d93a1f1d440ffc1093c7/foodMap`);
                const foodData = response.data.foodMap;
                const map = new Map(Object.entries(foodData));
                setFoodMap(map);
            } catch (error) {
                console.error('Error fetching food map:', error);
            }
        };
        
        fetchFoodMap();
    }, []);

    const handleRemoveFood = async () => {
        const { foodName, quantity } = newFood;

        console.log("Removing food:", newFood);

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
            const response = await axios.delete(`http://localhost:5050/api/refrigerator/67e8d93a1f1d440ffc1093c7/removeFoods`, {data: { foodName, quantity }});

            if (response.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Food removed successfully.',
                    status: 'success',
                    isClosable: true,
                });

                // Reset form after success
                setNewFood({ foodName: '', quantity: '' });

                // Re-fetch the foodMap after adding a new food
                const updatedFoodMap = new Map(foodMap);
                updatedFoodMap.set(foodName, quantity); // Add the new food to the Map
                setFoodMap(updatedFoodMap);
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
            
            // Log error details for better debugging
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
                            value={newFood.foodName}
                            onChange={(e) => setNewFood({ ...newFood, foodName: e.target.value })}
                        />
                        <Input
                            placeholder='Quantity' 
                            type='number'
                            value={newFood.quantity}
                            onChange={(e) => setNewFood({ ...newFood, quantity: e.target.value })}
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
