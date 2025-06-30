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
        username: user.username,
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
      message: "An error occured during login"
    });
  }
})

router.post('/signup', async (req, res) => {
  const{ username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please enter all fields."
    });
  }

  try {
    // const existingUser = await User.findOne({$or: [{username}, {email}]});
    // if (existingUser) {
    //   return res.status(400).json({message: "Username or email already taken."});
    // }
    const existingUsername = await User.findOne({username});
    const existingEmail = await User.findOne({email});
    if (existingUsername) {
      return res.status(400).json({message: "Username already taken."});
    } if (existingEmail) {
      return res.status(400).json({message: "Email already taken."});
    }
    const newUser = new User ({username, email, password});
    await newUser.save();
    res.status(201).json("User created successfully.");
  } catch (error) {
    res.status(500).json({
        message: "An error occurred during signup."
    });
  }
  
})


export default router;