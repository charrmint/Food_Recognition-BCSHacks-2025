import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import {Box, Button, VStack, HStack, Image} from '@chakra-ui/react';

const foodData = ['Banana', 'Apple', 'Pizza', 'Milk', 'Egg',
                'Cookie', 'Strawberry', 'Orange', 'Chocolate', 'Bread',
                'Carrot', 'Broccoli', 'Grapes', 'Tomato', 'Avocado',
                'Electronic Device', 'Lemon', 'Rice', 'Chocolate Bar']

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

        sendToFoodRecognition(imageSrc);
        // const saveLocally = () => {
        //     const link = document.createElement('a');
        //     link.href = imageSrc;
        //     link.download = `webcam-capture-${Date.now()}.jpeg`;
        //     link.click();
        // };

        // const sendToApi = async () => {
        //     try {
        //         const response = await fetch('AHHHHH', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'image/jpeg',
        //             },
        //             body: blob
        //         });
        //         if (!response.ok) {
        //             throw new Error('Failed to send image to API');
        //         }

        //         const data = await response.json();
        //         console.log('Success:', data);
        //     } catch (error) {
        //         console.error('Error sending image:', error);
        //     }
        // };
        // console.log("hello");
        // saveLocally();
        // sendToApi();
    }, [webcamRef]);

    const sendToFoodRecognition = async (base64Image) => {
        try {
            //Extract the actual base 64 data
            const base64Data = base64Image.split(',')[1];
            // console.log('Original Image Src:', base64Image.substring(0, 100)); // Log the start of the data URL
            // console.log('Extracted Base64 Data (first 100 chars):', base64Data.substring(0, 100));

            const apiKey = import.meta.env.VITE_APP_GOOGLE_CLOUD_API_KEY;
            console.log('API Key Loaded:', apiKey ? 'Yes' : 'No');

            if(!apiKey) {
                throw new Error('API key not found in environment variables');
            }

            //Request body for Product Search
            const requestBody = {
                requests: [{
                    image: {content: base64Data},
                    features: [{
                        type: "LABEL_DETECTION",
                        maxResults: 20
                    },
                    {
                        type: "WEB_DETECTION",
                        maxResults: 20
                    }
                    ]
                
                }]
            };
            //Send to Google Cloud Vision API
            const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                }
            );

            if(!response.ok) {
                // throw new Error(`Failed to send image to API: ${response.status}`);
                let errorData = null;
                try {
                    errorData = await response.json();
                    console.error('API Error Response Body:', errorData);
                }
                catch (e) {
                    try {
                        const errorText = await response.text();
                        console.error('API Error Response Text:', errorText);
                    }
                    catch (textErr) {
                        console.error('Could not read error response body.');
                    }
                }
                const errorMessage = `Failed to send image to API: ${response.status} ${response.statusText}. ${errorData ? JSON.stringify(errorData.error || errorData) : 'No details in response body.'}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Success', data);

            return processDetailedFoodResults(data);
        } catch(error) {
            console.error('Error with food recognition:', error);
            return null;
        }
    };

    const processDetailedFoodResults = (data) => {
        let processedData = [];
        console.log("Raw API Response:", data);
        if (data.responses && data.responses[0] && data.responses[0].labelAnnotations) {
            const labels = data.responses[0].labelAnnotations.map(label => label.description);
            for (let i = 0; i < labels.length; i++) {
                for (let j = 0; j < foodData.length; j++) {
                    if (labels[i] == foodData[j]) {
                        processedData.push(labels[i]);
                    }
                }
            }
            console.log("Detected Labels:", labels);
            console.log("Filtered labels", processedData);
        }
        if (data.responses && data.responses[0] && data.responses[0].webDetection) {
            console.log("Web Detection:", data.responses[0].webDetection);
        }
        return processedData;
    }

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
