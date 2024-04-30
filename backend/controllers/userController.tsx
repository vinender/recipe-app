import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
    // Add any other properties you expect in the JWT payload
  }
export const getCurrentUser = async (req: Request, res: Response) => {
    try {
      console.log(req.headers['authorization']);
  
      // Extract token from Authorization header
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Authorization header is missing or invalid');
      }
  
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
      // Verify token
      const jwtSecret = process.env.JWT_SECRET || 'mySecretKey';
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
  
      // Find user by ID
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      console.log(user);
      return res.json(user); // Return user object as JSON
    } catch (error) {
      console.error('Error fetching current user:', error);
      // 2. TS18046: 'error' is of type 'unknown'
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message }); // Return error message
      } else {
        return res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };