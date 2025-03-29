import { chakra, useClipboard } from "@chakra-ui/react";
import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px = {4}>
      <Flex h = {16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
              base: "column",
              sm: "row"
            }}
      >
        <Text
          bgGradient= 'linear(to-l, #7929CA, #FF0080'
          bgClip= 'text'
          fontSize='6xl'
          fontWeight='bold'
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to = {"/"}> Inventory </Link>
          
        </Text>
        <HStack spacing ={2} alignItems={"center"}>
          <Link to = {"/create"}>
          <Button>
            <PlusSquareIcon fontSize={20} />
          </Button>
          </Link>
        </HStack>

      </Flex>

    </Container>
  )
};
export default Navbar;