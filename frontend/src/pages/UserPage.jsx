import { useState } from 'react';
import { Box, Container, Heading, Input, Button, useToast, VStack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

// const UserPage = () => {
//     const [userDetails, setUserDetails] = useState({
//         name: "",
//         email: "",
//         password: "",
//         refrigeratorId: ""
//     });

//     const toast = useToast();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserDetails((prevDetails) => ({
//             ...prevDetails,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async () => {
//         const { name, email, password, refrigeratorId } = userDetails;

//         if (!name || !email || !password || !refrigeratorId) {
//             toast({
//                 title: "Error",
//                 description: "All fields are required.",
//                 status: "error",
//                 isClosable: true,
//             });
//             return;
//         }

//         try {
//             // Send POST request to backend
//             const response = await axios.post("http://localhost:5050/api/user/", {
//                 name, 
//                 email, 
//                 password, 
//                 refrigeratorId
//             });

//             if (response.status === 201) {
//                 toast({
//                     title: 'Success',
//                     description: 'User added successfully.',
//                     status: 'success',
//                     isClosable: true,
//                 });
             
            
//                 // Reset form after success
//                 setUserDetails({ 
//                     name: '', 
//                     email: '',
//                     password: '',
//                     refrigeratorId: '' 
//                 });
//             } else {
//                 toast({
//                     title: 'Error',
//                     description: `Failed to add user. Status: ${response.status}`,
//                     status: 'error',
//                     isClosable: true,
//                 });
//             }
//         } catch (error) {
//             console.error('Error adding user:', error);
            
//             // Log error details for better debugging
//             if (error.response) {
//                 console.error('Error response:', error.response);
//                 toast({
//                     title: 'Error',
//                     description: `API Error: ${error.response.data.error}`,
//                     status: 'error',
//                     isClosable: true,
//                 });
//             } else {
//                 toast({
//                     title: 'Error',
//                     description: 'Something went wrong.',
//                     status: 'error',
//                     isClosable: true,
//                 });
//             }
//         }
//     };

//     return (
//         <Container maxW="container.sm">
//             <VStack spacing={12}>
//                 <Heading as="h1" size="2xl" textAlign="center" mb={8}>
//                     Create New User
//                 </Heading>
//                 <Box
//                     w="300px"
//                     bg={useColorModeValue("white", "gray.800")}
//                     p={6}
//                     rounded="lg"
//                     shadow="md"
//                 >
//                     <VStack spacing={10}>
//                         <Input
//                             placeholder="Name"
//                             name="name"
//                             value={userDetails.name}
//                             onChange={handleInputChange}
//                         />
//                         <Input
//                             placeholder="Email"
//                             name="email"
//                             type="email"
//                             value={userDetails.email}
//                             onChange={handleInputChange}
//                         />
//                         <Input
//                             placeholder="Password"
//                             name="password"
//                             type="password"
//                             value={userDetails.password}
//                             onChange={handleInputChange}
//                         />
//                         <Input
//                             placeholder="Refrigerator ID"
//                             name="refrigeratorId"
//                             value={userDetails.refrigeratorId}
//                             onChange={handleInputChange}
//                         />
//                         <Button colorScheme="blue" onClick={handleSubmit} w="full">
//                             Create User
//                         </Button>
//                     </VStack>
//                 </Box>
//             </VStack>
//         </Container>
//     );
// };

// export default SignupPage;

// src/pages/SignupPage.jsx

// import React from "react";

// export default function SignupPage() {
//   return (
//     <div className="w-screen h-screen bg-[#FFF1D8] flex justify-center items-center">
//       <div className="w-[632px] h-[689px] bg-white border border-[#FFBDBD] shadow-xl relative rounded-lg p-10">
//         <h1 className="text-[48px] font-bold text-[#FFC148] text-center mt-5">Sign up</h1>

//         <div className="flex flex-col gap-6 mt-16 items-center">
//           {/* Name Input */}
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-[378px] h-[52px] border border-[#969696] rounded px-4 text-[20px] text-[#6E6E6E]"
//           />

//           {/* Email Input */}
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-[378px] h-[52px] border border-[#969696] rounded px-4 text-[20px] text-[#6E6E6E]"
//           />

//           {/* Password Input */}
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-[378px] h-[52px] border border-[#969696] rounded px-4 text-[20px] text-[#6E6E6E]"
//           />

//           {/* Buttons */}
//           <div className="flex justify-between w-[378px] mt-4">
//             <button className="w-[170px] h-[52px] bg-[#FFC148] text-white rounded-full font-semibold text-[20px]">
//               Sign up
//             </button>

//             <div className="text-center">
//               <p className="text-[11px] text-black mb-1">Already have an account?</p>
//               <button className="w-[170px] h-[52px] border border-[#969696] rounded-full text-black font-semibold text-[20px]">
//                 Log in
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




