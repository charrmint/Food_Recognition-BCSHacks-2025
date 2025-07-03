import { useState } from 'react';
import { Box, Container, Heading, Input, Button, useToast, VStack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    });
    
    const toast = useToast();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
          ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const { username, email, password } = userDetails;

        if (!username || !email || !password) {
            toast({
                title: "Error",
                description: "All fields are required.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        try {
            //Send POST request to backend
            const response = await axios.post("http://localhost:5050/api/auth/signup", {
                username,
                email, 
                password
            });
            
            // const response = await fetch ('http://localhost:5050/api/auth/signup', 
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(userDetails),
            //     }
            // );
            // const data = await response.json();
            // console.log(data);

            if (response.status === 201) {
                toast({
                  title: 'Success',
                  description: 'User added succesfully',
                  status: 'success',
                  isClosable: true,
              });

              localStorage.setItem('user', JSON.stringify(response.data));

              setUserDetails({
                username: "",
                email: "",
                password: ""
              })
              navigate("/login");
            } else {
                toast({
                    title: 'Error',
                    description: `Failed to add user: ${response.status}`,
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
                    Sign up
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
                            placeholder="Username"
                            name="username"
                            type="username"
                            value={userDetails.username}
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
                        <Button colorScheme="blue" onClick={handleSubmit} w="full">
                            Sign up
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default SignupPage;

// export default function SignupPage() {
//   console.log("SignupPage really loaded");

//   return (
//     <div>
//       <h1 style={{ color: "red" }}>SIGNUP PAGE TEST</h1>
//       <button onClick={() => console.log("CLICKED")}>Click me</button>
//     </div>
//   );
// }


