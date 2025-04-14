import { Request, Response } from 'express';

export const getHome = (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'API is working!',
    });
};