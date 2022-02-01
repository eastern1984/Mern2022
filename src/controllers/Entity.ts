import { Request, Response, NextFunction } from 'express';
import Entity from '../models/Entity';

export const getEntities = async (req: Request, res: Response, next: NextFunction) => {
    const entities = await Entity.find();
    return res.json({ success: 'OK', data: entities });
}

export const getEntity = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const entity = await Entity.findById(id);
    return res.json({ success: 'OK', data: entity });
}

export const postEntity = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const data = req.body.data;
    const entity = await Entity.findById(id);

    await entity?.save();

    return res.json({ success: 'OK' });
}