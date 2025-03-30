import {Box, Container, Heading, useColorModeValue, useToast, VStack, Input, Button} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
//let refrigerator_id_here = 1;

//needs to interact with backend to be able to addFoods
const CreatePage = () => {
    const [newFood, setNewFood] = useState({
        name: "",
        quantity: "",
    });

    const [foodMap, setFoodMap] = useState(new Map());
    const toast = useToast()

    //new
    // const {foodList, createFood, fetchFood } = useFoodStore();
    
    useEffect(() => {
        const fetchFoodMap = async() => {
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

    const handleAddFood = async () => {
        const { name, quantity } = newFood;

        console.log("Adding food:", newFood);

        if (!name || !quantity) {
            toast({
                title: 'Error',
                description: 'Food name and quantity are required.',
                status: 'error',
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5050/api/refrigerator/67e8d93a1f1d440ffc1093c7/addFood`, { name, quantity });

            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'Food added successfully.',
                    status: 'success',
                    isClosable: true,
                });
                
                // Reset form after success
                setNewFood({ name: '', quantity: '' });
                
                // Re-fetch the foodMap after adding a new food
                const updatedFoodMap = new Map(foodMap);
                updatedFoodMap.set(name, quantity); // Add the new food to the Map
                setFoodMap(updatedFoodMap);
            }
        } catch (error) {
            console.error('Error adding food:', error);
            toast({
                title: 'Error',
                description: error.response ? error.response.data.error : 'Something went wrong.',
                status: 'error',
                isClosable: true,
            });
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