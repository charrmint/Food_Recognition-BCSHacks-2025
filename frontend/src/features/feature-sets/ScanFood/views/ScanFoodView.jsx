import { Box, Container, Heading, Text, Button, VStack, HStack, Spinner, Tag, Wrap, WrapItem, useColorModeValue } from '@chakra-ui/react'
import Webcam from 'react-webcam'
import { messages } from './messages'

const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user',
}

export const ScanFoodView = ({
    cameraEnabled,
    toggleCamera,
    webcamRef,
    imgSrc,
    isProcessing,
    detectedFoods,
    capture,
    clearCapture,
}) => {
    const bgColor = useColorModeValue('white', 'gray.800')
    const placeholderBg = useColorModeValue('gray.100', 'gray.700')

    return (
        <Container maxW="container.md">
            <VStack spacing={6}>
                <Heading as="h1" size="xl" textAlign="center">
                    {messages.header}
                </Heading>
                <Text color="gray.500" textAlign="center">
                    {messages.subheader}
                </Text>

                <Button
                    colorScheme={cameraEnabled ? 'red' : 'green'}
                    onClick={toggleCamera}
                    size="md"
                >
                    {cameraEnabled ? messages.turnOffCamera : messages.turnOnCamera}
                </Button>

                {cameraEnabled && (
                    <Box
                        bg={bgColor}
                        p={4}
                        rounded="lg"
                        shadow="md"
                        position="relative"
                    >
                        {!imgSrc ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                style={{ borderRadius: '8px' }}
                            />
                        ) : (
                            <img
                                src={imgSrc}
                                alt="Captured"
                                style={{ borderRadius: '8px', width: '100%' }}
                            />
                        )}

                        {isProcessing && (
                            <Box
                                position="absolute"
                                top="0"
                                left="0"
                                right="0"
                                bottom="0"
                                bg="blackAlpha.600"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="8px"
                            >
                                <VStack>
                                    <Spinner size="xl" color="white" />
                                    <Text color="white" fontWeight="bold">
                                        {messages.processingLabel}
                                    </Text>
                                </VStack>
                            </Box>
                        )}
                    </Box>
                )}

                {!cameraEnabled && (
                    <Box
                        bg={placeholderBg}
                        p={8}
                        rounded="lg"
                        textAlign="center"
                        w="full"
                        maxW="640px"
                    >
                        <Text color="gray.500">{messages.cameraOff}</Text>
                    </Box>
                )}

                {cameraEnabled && (
                    <HStack spacing={4}>
                        {!imgSrc ? (
                            <Button
                                colorScheme="blue"
                                size="lg"
                                onClick={capture}
                                isLoading={isProcessing}
                            >
                                {messages.captureButton}
                            </Button>
                        ) : (
                            <Button
                                colorScheme="gray"
                                size="lg"
                                onClick={clearCapture}
                                isDisabled={isProcessing}
                            >
                                {messages.retakeButton}
                            </Button>
                        )}
                    </HStack>
                )}

                {detectedFoods.length > 0 && (
                    <Box w="full" p={4} bg={bgColor} rounded="lg" shadow="md">
                        <Text fontWeight="bold" mb={2}>
                            {messages.detectedLabel}
                        </Text>
                        <Wrap>
                            {detectedFoods.map((food, index) => (
                                <WrapItem key={index}>
                                    <Tag colorScheme="green" size="lg">
                                        {food}
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                )}
            </VStack>
        </Container>
    )
}