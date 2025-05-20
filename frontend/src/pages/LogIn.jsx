import { useState } from 'react';
import { Box, Container, Heading, Input, Button, useToast, VStack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

const LogIn = () => {
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    });

    const toast = useToast();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserCredentials((prevDetails) => ({
          ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const { email, password } = userCredentials;

        if (!email || !password ) {
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
            const response = await axios.post("http://localhost:5050/api/auth/login", {
                email, 
                password
            });

            if (response.status === 200) {

                const token = response.data.token;
                
                const user = {
                  _id: response.data._id,
                  name: response.data.name,
                  email: response.data.email,
                  regrigeratorId: response.data.refrigeratorId
                }

                localStorage.setItem('authToken', token);
                localStorage.setItem('userInfor', JSON.stringify(user));

                toast({
                  title: 'Success',
                  description: 'User logged in succesfully',
                  status: 'success',
                  isClosable: true,
              });

              navigate('/HomePage');

              setLoginCredentials({
                email: "",
                password: ""
              })
            } else {
                toast({
                    title: 'Login Failed',
                    description: `Unexpected response: ${response.status}`,
                    status: 'error',
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error adding user:', error);
          }
    };

    return (
        <Container maxW="container.sm">
            <VStack spacing={12}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    Log In
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
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={userCredentials.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={userCredentials.password}
                            onChange={handleInputChange}
                        />
                        <Button colorScheme="blue" onClick={handleSubmit} w="full">
                            Log In
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default LogIn;
