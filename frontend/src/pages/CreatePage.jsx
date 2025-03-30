import {Box, Container, Heading, useColorModeValue, useToast, VStack, Input, Button} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import {useFoodStore} from '../store/food';
//let refrigerator_id_here = 1;

//needs to interact with backend to be able to addFoods
const CreatePage = () => {
    const [newFood, setNewFood] = useState({
        name: "",
        quantity: "",
    });

    const toast = useToast()

    //new
    const {foodList, createFood, fetchFood } = useFoodStore();
    
    useEffect(() => {
        fetchFood();
    }, [fetchFood, foodList]);

    const handleAddFood = async() => {
        //const { name, quantity } = newFood;
        const { success, message } = await createFood(newFood);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            isClosable: true,
        });

        if (success) {
            setNewFood({ name: "", quantity: "" }); // reset input
            fetchFood();
            //new
        }
    };

    return (
    <Container maxW= "container.sm">
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
                        value={newFood.name}
                        onChange={(e) => setNewFood({ ...newFood, name: e.target.value})}
                        />
                        <Input
                        placeholder='Quantity'
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
    );
};

export default CreatePage;