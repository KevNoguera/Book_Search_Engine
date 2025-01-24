import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

const secretKey = process.env.JWT_SECRET_KEY || '';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('No authorization header');
  }
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
      return decoded; 
    } catch (err) {
      throw new Error('Forbidden: Invalid token');
    }
  };


export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
