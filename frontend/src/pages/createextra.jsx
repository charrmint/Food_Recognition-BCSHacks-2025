import {Box, Container, Heading, useColorModeValue, useToast, VStack, Input, Button} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useFoodStore } from "../store/food";
import FoodCard from '../components/FoodCard';
//let refrigerator_id_here = 1;

//needs to interact with backend to be able to addFoods
const CreatePage = () => {
    const [newFood, setNewFood] = useState({
        foodName: "",
        quantity: "",
    });

    //const [foodMap, setFoodMap] = useState(new Map());
    const toast = useToast();


    const handleAddFood = async () => {
        const { foodName, quantity } = newFood;

        console.log("Adding food:", newFood);

        if (!foodName || !quantity) {
            toast({
                title: 'Error',
                description: 'Food name and quantity are required.',
                status: 'error',
                isClosable: true,
            });
            return;
        }

        const { createFood } = useFoodStore();
        const result = await createFood({ name: foodName, quantity: Number(quantity) });
        
        if (result.success) {
            toast({
                title: "Success",
                description: result.message,
                status: "success",
                isClosable: true,
            });
            setNewFood({ foodName: "", quantity: "" }); // Reset input fields
        } else {
            toast({
                title: "Error",
                description: result.message,
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.sm">
            <VStack spacing={12}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    Add new food
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
                            handleAddFood();
                        }} w="full">
                            Add Food
                        </Button>
                    </VStack>
                </Box>
                
               
               

            </VStack>
        </Container>
    );
};

export default CreatePage;
