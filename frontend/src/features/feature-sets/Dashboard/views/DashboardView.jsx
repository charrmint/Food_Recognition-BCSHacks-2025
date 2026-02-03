import { Box, Container, Flex, HStack, Button, Text, useColorMode, useColorModeValue, IconButton, Divider, VStack } from '@chakra-ui/react'
import { LuSun } from 'react-icons/lu'
import { IoMoon } from 'react-icons/io5'
import { messages } from './messages'

import InventoryPresenter from '../../Inventory/presenter/InventoryPresenter'
import AddFoodPresenter from '../../AddFood/presenter/AddFoodPresenter'
import RemoveFoodPresenter from '../../RemoveFood/presenter/RemoveFoodPresenter'
import ScanFoodPresenter from '../../ScanFood/presenter/ScanFoodPresenter'
import AskFoodPresenter from '../../AskFood/presenter/AskFoodPresenter'

export const DashboardView = ({
    user,
    handleLogout,
}) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const bgColor = useColorModeValue('white', 'gray.800')
    const borderColor = useColorModeValue('gray.200', 'gray.700')

    return (
        <Box minH="100vh">
            {/* Navbar */}
            <Box
                bg={bgColor}
                borderBottom="1px"
                borderColor={borderColor}
                position="sticky"
                top="0"
                zIndex="10"
            >
                <Container maxW="container.xl">
                    <Flex h="16" alignItems="center" justifyContent="space-between">
                        <Text
                            fontSize={{ base: '20', sm: '24' }}
                            fontWeight="bold"
                            bgGradient="linear(to-r, cyan.400, blue.500)"
                            bgClip="text"
                        >
                            {messages.appTitle}
                        </Text>

                        <HStack spacing={2}>
                            <IconButton
                                aria-label="Toggle color mode"
                                icon={colorMode === 'light' ? <IoMoon /> : <LuSun />}
                                onClick={toggleColorMode}
                                variant="ghost"
                                size="sm"
                            />
                            <Button
                                colorScheme="red"
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                            >
                                {messages.logoutButton}
                            </Button>
                        </HStack>
                    </Flex>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxW="container.xl" py={8}>
                <VStack spacing={8} align="stretch">

                    {/* Top section: Inventory (left) | Add/Remove/Ask (right) */}
                    <Flex
                        direction={{ base: 'column', lg: 'row' }}
                        gap={8}
                        align="flex-start"
                    >
                        {/* Inventory - takes more space */}
                        <Box flex="2" w="full">
                            <InventoryPresenter />
                        </Box>

                        {/* Add, Remove, Ask - stacked on the right */}
                        <VStack flex="1" spacing={6} w="full">
                            <Box w="full">
                                <AddFoodPresenter />
                            </Box>
                            <Box w="full">
                                <RemoveFoodPresenter />
                            </Box>
                            <Box w="full">
                                <AskFoodPresenter />
                            </Box>
                        </VStack>
                    </Flex>

                    <Divider />

                    {/* Bottom: Scan Food */}
                    <Box>
                        <ScanFoodPresenter />
                    </Box>

                </VStack>
            </Container>
        </Box>
    )
}