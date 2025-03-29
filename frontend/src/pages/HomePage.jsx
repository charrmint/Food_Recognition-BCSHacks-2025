import { Container, Text, VStack } from '@chakra-ui/react';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
      <Text 
          fontsize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
      >
        Fridge
        </Text>

      <Text fontsize='xl' textAlign={"center"} fontWeight='bold' color = 'gray.500'>
      No foods added {" "}
      <Link to={"/create"}>
      <Text as='span' color='blue.500' _hovor={{ textDecoration: "underline"}}>
        Check for food
        </Text>
        </Link>
        </Text>
      </VStack>
    </Container>
  )
};
export default HomePage;