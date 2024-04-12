import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';

export const generateToken = (payload)=>{
    return jwt.sign(payload , SECRET_KEY)
};

export const verifyToken = (token)=>{
    return jwt.verify(token,SECRET_KEY)
};
