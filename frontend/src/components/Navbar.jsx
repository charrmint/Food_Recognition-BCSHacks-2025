import { chakra, useClipboard, useColorModeValue } from "@chakra-ui/react";
import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { MdSettings } from "react-icons/md"
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px = {4} >
      <Flex h = {16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
              base: "column",
              sm: "row"
            }}
      >
        <Text
          fontSize={{base: "22", sm: "28"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to = {"/"}> Food Inventory </Link>
        </Text>
        <HStack spacing ={2} alignItems={"center"}>
        

          <Link to = {"/addFood"}>
          <Button>
            <PlusSquareIcon fontSize={20} />
          </Button>
          </Link>

          <Link to = {"/removeFood"}>
          <Button>
            <MinusIcon fontSize={20} />
          </Button>
          </Link>

          <Link to={"/user"}>
            <Button>
              <MdSettings fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon size='20' /> : <LuSun size='20' />}
          </Button>
        </HStack>

      </Flex>

    </Container>
  )
};
export default Navbar;