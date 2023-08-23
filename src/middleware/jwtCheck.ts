import { verifyAccessToken } from './../services/jwtService';
import { NextFunction, Request, Response } from "express";


interface RequestWithIdUsers extends Request {
    user?: number,
}
export const verifyTokenMiddleware = async (req: RequestWithIdUsers, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
        const verifyToken: any = verifyAccessToken(token)
        if (verifyToken) {
            req.user = verifyToken.id_users;
            next();
          } else {
            res.status(403).json({ error: 'Invalid token' });
          }
    } catch (error) {  
        return res.sendStatus(401)
    }
}