import {Box, Container, Heading, useColorModeValue, useToast, VStack} from '@chakra-ui/react';
import {useState} from 'react';
import {useFoodStore} from '../store/food';

//needs to interact with backend to be able to addFoods
const CreatePage = () => {
    const [newFood, setNewFood] = useState({
        question: "",
    });

    const toast = useToast()

    const {createFood}=useFoodStore()

    const handleAddFood = async() => {
        const {success,message} = await createFood(newFood);
            if (!success) {
                toast ({
                title:"error",
                description: message,
                status:"error",
                isClosable: true,
            });
            } else {
                toast ({
                    title:"success",
                    description: message,
                    status:"success",
                    isClosable: true,
                });
            }
            setNewFood({question: ""});
        };
    return (
    <Container maxW= {"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2x1"} testAlign={"center"} mb={8}>
                Create new food
            </Heading>

            <Box
                    w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                        placeholder='Question'
                        //question='question'
                        value={newFood.question}
                        onChange={(e) => setNewFood({ ...newFood, question: e.target.value})}
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