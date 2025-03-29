import {Box, Container, Heading, useColorModeValue, VStack} from '@chakra-ui/react';
import {useState} from 'react';

const CreatePage = () => {
    const [newFood, setNewFood] = useState({
        question: "",
    });

    const handleAddFood = () => {
        console.log(newFood)
    }
    return (
    <Container maxW= "container.sm">
        <VStack spacing={8}>
            <Heading as={"h1"} size="2x1" testAlign={"center"} mb={8}>
                Create new product
            </Heading>

            <Box
                    w={"full"} bg={useColorModeValue("white", "grey.800")}
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