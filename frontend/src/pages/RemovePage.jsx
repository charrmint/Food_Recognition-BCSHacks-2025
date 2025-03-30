import {Box, Container, Heading, useColorModeValue, useToast, VStack, Input, Button} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import axios from 'axios';
//let refrigerator_id_here = 1;

//needs to interact with backend to be able to addFoods
const RemovePage = () => {
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [foodMap, setFoodMap] = useState(new Map());
    const toast = useToast();
    const refrigeratorId = "67e8d93a1f1d440ffc1093c7";

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
            const response = await axios.delete(`http://localhost:5050/api/refrigerator/67e8d93a1f1d440ffc1093c7/removeFood`, { foodName, quantity });

            if (response.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Food removed successfully.',
                    status: 'success',
                    isClosable: true,
                });

                // Update the food map
                const updatedFoodMap = new Map(foodMap);
                const currentQuantity = parseInt(updatedFoodMap.get(foodName), 10);
                
                if (currentQuantity <= quantity) {
                    updatedFoodMap.delete(foodName);
                } else {
                    updatedFoodMap.set(foodName, (currentQuantity - quantity).toString());
                }

                setFoodMap(updatedFoodMap);
                setFoodName('');
                setQuantity('');
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

    
};

export default RemoveFoodsPage;
