import { useState } from 'react';
import { Box, Container, Heading, Input, Button, useToast, VStack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

const UserPage = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        refrigeratorId: ""
    });

    const toast = useToast();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const { name, email, password, refrigeratorId } = userDetails;

        if (!name || !email || !password || !refrigeratorId) {
            toast({
                title: "Error",
                description: "All fields are required.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        try {
            // Send POST request to backend
            const response = await axios.post("http://localhost:5050/api/user/", {
                name, 
                email, 
                password, 
                refrigeratorId
            });

            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'User added successfully.',
                    status: 'success',
                    isClosable: true,
                });
             
            
                // Reset form after success
                setUserDetails({ 
                    name: '', 
                    email: '',
                    password: '',
                    refrigeratorId: '' 
                });
            } else {
                toast({
                    title: 'Error',
                    description: `Failed to add user. Status: ${response.status}`,
                    status: 'error',
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error adding user:', error);
            
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
                    Create New User
                </Heading>
                <Box
                    w="300px"
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded="lg"
                    shadow="md"
                >
                    <VStack spacing={10}>
                        <Input
                            placeholder="Name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={userDetails.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={userDetails.password}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Refrigerator ID"
                            name="refrigeratorId"
                            value={userDetails.refrigeratorId}
                            onChange={handleInputChange}
                        />
                        <Button colorScheme="blue" onClick={handleSubmit} w="full">
                            Create User
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default UserPage;
