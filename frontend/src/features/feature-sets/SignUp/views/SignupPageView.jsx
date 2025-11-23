import { Box, Container, Heading, Input, Button, useToast, VStack, useColorModeValue } from '@chakra-ui/react';
import { messages } from './messages';

export const SignupPageView = ({ userDetails, handleInputChange, handleSubmit, submitting }) => {
    
    return (
        <Container maxW="container.sm">
            <VStack spacing={12}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    {messages.headerMessage}
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
                            placeholder={messages.userNamePlaceholder}
                            name={messages.userNameName}
                            type={messages.userNameType}
                            value={userDetails.username}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder={messages.emailPlaceholder}
                            name={messages.emailName}
                            type={messages.emailType}
                            value={userDetails.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder={messages.passwordPlaceholder}
                            name={messages.passwordName}
                            type={messages.passwordType}
                            value={userDetails.password}
                            onChange={handleInputChange}
                        />
                        <Button colorScheme="blue" onClick={handleSubmit} w="full">
                            {messages.submitMessage}
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}


