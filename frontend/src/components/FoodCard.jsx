import {Box, Heading, Text} from '@chakra-ui/react';
import {FaAppleAlt, FaCarrot } from 'react-icons/fa'; 

const foodIconMap = {
    //water: <FaBottleWater size={50} />,
    apple: <FaAppleAlt size={50} />,
    carrot: <FaCarrot size={50} />,
  };

  //takes in food object, from backend, which has name and quantity
const FoodCard = ({food}) => {

    const foodIcon = foodIconMap[food.name.toLowerCase()] || null;
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
      <Heading size="md">{food.name}</Heading>
      <Text fontSize="lg" color="gray.600">Quantity: {food.quantity}</Text>
    </Box>
  );
};

export default FoodCard
