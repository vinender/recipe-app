 
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';



export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Include the user details in the response body along with the token
    res.status(201).json({ message: 'User registered successfully', user: newUser, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user with the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Include the user details in the response body along with the token
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
