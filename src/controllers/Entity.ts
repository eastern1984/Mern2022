import { Request, Response, NextFunction } from 'express';
import Entity from '../models/Entity';
import User from '../models/User';

const ENTITIES = [{ id: '1', name: 'Entity1' }, { id: '2', name: 'Entity2' }, { id: '3', name: 'Entity3' }, { id: '4', name: 'Entity4' },];

export const getEntities = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.session.userId);

    if (!user) {
        return res.json({ success: 'Error', message: 'No user' });
    }

    const entities = await Entity.find({ _id: { "$in": user.entities } });
    return res.json({ success: 'OK', data: ENTITIES, test: entities, userEntities: user.entities });
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