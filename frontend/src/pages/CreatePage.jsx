import {Box, Container, Heading, useColorModeValue, useToast, VStack, Input, Button} from '@chakra-ui/react';
import {useState} from 'react';
import {useFoodStore} from '../store/food';
let refrigerator_id_here = 1;

//needs to interact with backend to be able to addFoods
const CreatePage = () => {
    const [newFood, setNewFood] = useState({
        name: "",
        quantity: "",
    });

    const toast = useToast()

    const { createFood }=useFoodStore()

    const handleAddFood = async() => {
        const { name, quantity } = newFood;
        //const { success,message } = await createFood(newFood);
            
        //send a POST request to backend
        try {
            const res = await fetch('/api/foods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    refrigeratorID: refrigerator_id_here,  // hardcode our fridge ID
                    quantity,
                }),
            });
        
        const data = await res.json();
        
        toast ({
            title:"success",
            description: data.message,
            status:"success",
            isClosable: true,
        });
        
        //reset
        setNewFood({name: "", quantity: ""});

    } catch (error) {
        toast ({
            title:"error",
            description: error.message,
            status:"error",
            isClosable: true,
        });
    }
    };
    return (
    <Container maxW= "container.sm">
        <VStack spacing={2}>
            <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                Create new food
            </Heading>

            <Box
                    w="100px" bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={2}>
                        <Input
                        placeholder='Food name'
                        //name='Food name'
                        value={newFood.name}
                        onChange={(e) => setNewFood({ ...newFood, name: e.target.value})}
                        />
                        <Input
                        placeholder='Quantity'
                        //name='quantity'
                        type='number'
                        value={newFood.quantity}
                        onChange={(e) => setNewFood({ ...newFood, quantity: e.target.value})}
                        />

<Button colorScheme='blue'onClick={handleAddFood} w ='full'>
    Add Food
    </Button>
                        </VStack>

                </Box>
        </VStack>
        </Container>
    
);};
export default CreatePage;