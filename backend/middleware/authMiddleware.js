import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import Refrigerator from '../models/Refrigerator.js';
import res from 'express/lib/response.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            return next();
        } catch (error) {
            console.error("Error during token verification:", error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const checkRefrigeratorAccess = async (req, res, next) => {
    try {
        const refrigerator = await Refrigerator.findById(req.params.id);

        if (!refrigerator) {
            return res.status(404).json({
                message: 'Refrigerator not found'
            });
        }

        const hasAccess = refrigerator.userList.some(
            userId => userId.equals(req.user._id)
        );

        if (!hasAccess) {
            return res.status(403).json({
                message: 'Not authorized to access this refrigerator'
            });
        }

        req.refrigerator = refrigerator;
        return next();
    } catch (error) {
        console.error('Error checking refrigerator access:', error);
        return res.status(500).json({
            message: 'Error checking refrigerator access'
        });
    }
};

export { protect, checkRefrigeratorAccess };