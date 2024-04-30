import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with the appropriate type for the decoded user data
}

// Authentication middleware
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    // Attach the decoded payload to the request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Error handling middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
};