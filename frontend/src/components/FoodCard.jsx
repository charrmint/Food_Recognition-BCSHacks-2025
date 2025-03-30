import {Box, Heading, Text, Flex} from '@chakra-ui/react';
import {FaAppleAlt, FaCarrot } from 'react-icons/fa'; 
import {GiBananaBunch, GiCakeSlice } from 'react-icons/gi'; 

const foodIconMap = {
    //water: <FaBottleWater size={50} />,
    apple: <FaAppleAlt size={50} color="red"/>,
    carrot: <FaCarrot size={50} color="orange"/>,
    bananas: <GiBananaBunch size={50} color="yellow"/>,
    cake: <GiCakeSlice size={50} color="white"/>,
    default: <FaAppleAlt size={50} color="gray" />,
  };

  //takes in food object, from backend, which has name and quantity
const FoodCard = ({food}) => {

    const foodIcon = foodIconMap[food.name.toLowerCase()] || foodIconMap["default"];
    //null if none of three
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.1s'
    _hover={{ transform: "translateY(-5px)", shadow: "lg"}}
    p={1}
    w="100px"
    h="100px"
    textAlign="center"
    bg= "rgb(211, 211, 211)"
    >

    {foodIcon ? (
        <Box mb={4}
        textAlign="center">
          {foodIcon}
          
        </Box>
      ) : (
        <Heading size="md" color="gray.500">
          no icon
        </Heading>
      )}
      <Flex justify="center" align="center" direction="row" gap={1}>
                <Heading size="md" color="gray.600" >{food.name}</Heading>
                <Text fontSize="lg" color="gray.600">x{food.quantity}</Text>
            </Flex>
    </Box>
  );
};

export default FoodCard
