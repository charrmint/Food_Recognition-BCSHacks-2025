import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useFoodStore } from '../store/food';
import FoodCard from '../components/FoodCard';

const HomePage = () => {
  const {fetchFood, foods} = useFoodStore();

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);
  console.log("foods",foods);

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

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
          {foods.map((food) => (
            <FoodCard key={food._id} food={food}/>
          ))}
        </SimpleGrid>

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