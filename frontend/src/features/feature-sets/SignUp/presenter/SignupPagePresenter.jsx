import { useState } from 'react';
import { Box, Container, Heading, Input, Button, useToast, VStack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/AuthStore';
import { SignupPageView } from '../views/SignupPageView';

const SignupPagePresenter = () => {
    const { userDetails, handleInputChange, handleSubmit, isFetching } = useSignUp();

    return (
        <SignupPageView 
            userDetails={userDetails}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isFetching={isFetching}
        />
    );
};

export default SignupPage;


