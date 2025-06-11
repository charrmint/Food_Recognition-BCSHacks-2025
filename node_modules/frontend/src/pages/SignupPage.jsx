import React from "react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';

const SignupPage = () => {
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
      <div className="w-screen h-screen bg-[#FFF1D8] flex justify-center items-center">
        <div className="w-[632px] h-[689px] bg-white border border-[#FFBDBD] shadow-xl relative rounded-lg p-10">
          <h1 className="text-[48px] font-bold text-[#FFC148] text-center mt-5">Sign up</h1>
  
          <div className="flex flex-col gap-6 mt-16 items-center">
            {/* Name Input */}
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-[378px] h-[52px] border border-[#969696] rounded px-4 text-[20px] text-[#6E6E6E]"
              value={userDetails.name}
              onChange={handleInputChange}
            />
  
            {/* Email Input */}
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-[378px] h-[52px] border border-[#969696] rounded px-4 text-[20px] text-[#6E6E6E]"
              value={userDetails.email}
              onChange={handleInputChange}
            />
  
            {/* Password Input */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-[378px] h-[52px] border border-[#969696] rounded px-4 text-[20px] text-[#6E6E6E]"
              value={userDetails.password}
              onChange={handleInputChange}
            />

            {/* Refrigerator ID */}
            <input
              name="refrigeratorID"
              type="refrigeratorID"
              placeholder="Refrigerator ID"
              className="w-[378px] h-[52px] border border-[#969696] rounded px-4 text-[20px] text-[#6E6E6E]"
              value={userDetails.refrigeratorId}
              onChange={handleInputChange}
            />
  
            {/* Buttons */}
            <div className="flex justify-between w-[378px] mt-4">
              <button className="w-[170px] h-[52px] bg-[#FFC148] text-white rounded-full font-semibold text-[20px]" onClick={handleSubmit}>
                Sign up
              </button>
  
              <div className="text-center">
                <p className="text-[11px] text-black mb-1">Already have an account?</p>
                <button className="w-[170px] h-[52px] border border-[#969696] rounded-full text-black font-semibold text-[20px]">
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SignupPage;




