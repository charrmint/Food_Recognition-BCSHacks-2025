import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import {Box, Button, VStack, HStack, Image} from '@chakra-ui/react';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

const WebCamCapture = () => {
    const [imgSrc, setImgSrc] = useState(null);
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);

        const saveLocally = () => {
            const link = document.createElement('a');
            link.href = imageSrc;
            link.download = `webcam-capture-${Date.now()}.jpeg`;
            link.click();
        };

        const sendToApi = async () => {
            try {
                const response = await fetch('AHHHHH', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'image/jpeg',
                    },
                    body: blob
                });
                if (!response.ok) {
                    throw new Error('Failed to send image to API');
                }

                const data = await response.json();
                console.log('Success:', data);
            } catch (error) {
                console.error('Error sending image:', error);
            }
        };
        saveLocally();
        // sendToApi();
    }, [webcamRef]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Space') {
                capture()
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [capture]);

    return (
        <VStack spacing ={4}>
            <Webcam
                audio = {false}
                height = {720}
                ref = {webcamRef}
                screenshotFormat = "image/jpeg"
                width = {1280}
                videoConstraints = {videoConstraints}
            />
            <Button onClick={capture}>Capture photo</Button>
        </VStack>
    )

};

export default WebCamCapture;
