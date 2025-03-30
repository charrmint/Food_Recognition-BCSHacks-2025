import {Box, Container, Heading, useColorModeValue, VStack} from '@chakra-ui/react';
import { FaBottleWater, FaAppleAlt, FaCarrot } from 'react-icons/fa'; 

const foodIconMap = {
    water: <FaBottleWater size={50} />,
    apple: <FaAppleAlt size={50} />,
    carrot: <FaCarrot size={50} />,
  };

  //takes in food name, from backend?
const FoodCard = ({food}) => {

    const foodIcon = foodIconMap[food.toLowerCase()] || null;
    //null if none of three
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
    p={4}
    textAlign="center"
    >

    {foodIcon ? (
        <Box mb={4}>
          {foodIcon}
        </Box>
      ) : (
        <Heading size="md" color="gray.500">
          no icon
        </Heading>
      )}
      <Heading size="md">{food}</Heading>
    </Box>
  );
};

export default FoodCard
