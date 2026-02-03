import express from "express"
import { protect } from "../middleware/authMiddleware"

const router = express.Router()

router.post('/', protect, async (req, res) => {
    try {
        const { image } = req.body

        if (!image) {
            return res.status(400).json({ error: 'No image provided' })
        }

        const base64data = image.includes(',') ? image.split(',')[1] : image

        const apiKey = process.env.GOOGLE_CLOUD_API_KEY

        if (!apiKey) {
            console.error('Google Cloud API key not configured')
            return res.status(500).json({ error: 'Server configuration error' })
        }

        const requestBody = {
            requests: [{
                image: { content: base64data },
                features: [
                    { type: 'LABEL_DETECTION', maxResults: 20 },
                    { type: 'WEB_DETECTION', maxResults: 20 }
                ]
            }]
        }

        const response = await fetch(
            `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            }
        )

        if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            console.error('Vision API error:', errorData)
            return res.status(502).json({ 
                error: 'Failed to process image',
                details: errorData?.error?.message 
            })
        }

        const data = await response.json()

        const foods = []

        if (data.responses?.[0]?.labelAnnotations) {
            data.responses[0].labelAnnotations.forEach(label => {
                if (label.score > 0.7 && !foods.includes(label.description)) {
                    foods.push(label.description)
                }
            })
        }

        console.log('Detected items:', foods)

        return res.status(200).json({ 
            success: true,
            foods 
        })
    } catch (error) {
        console.error('Error in scan route:', error)
        return res.status(500).json({ error: 'Server error processing image' })
    }
})

export default router