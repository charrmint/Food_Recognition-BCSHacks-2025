import express from 'express';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const{ email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter both email and password"
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token
      })
    }

    else {
      res.status(400).json({
        message: "Invalid email or password"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured ruing login"
    });
  }
})

router.post('/signup', async (req, res) => {
  const{ name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please enter all fields."
    });
  }
  const newUser = new User ({name, email, password});
  await newUser.save();
  res.status(201).json("User created successfully.");
})


export default router;