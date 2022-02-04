import { Request, Response, NextFunction } from 'express';
import Entity, { IMethod } from '../models/Entity';
import User from '../models/User';

export enum METHOD_TYPES { GET, POST }

export const getEntities = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.session.userId);

    if (!user) {
        return res.json({ success: 'Error', message: 'No user' });
    }

    const entities = await Entity.find({ _id: { "$in": user.entities } });
    return res.json({ success: 'OK', data: entities });
}

export const getEntity = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const entity = await Entity.findById(id);
    return res.json({ success: 'OK', data: entity });
}

export const postEntity = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const fields = req.body.fields;
    const entity = await Entity.findById(id);

    const newFilterSchema: IMethod = {
        type: METHOD_TYPES.GET,
        filterSchema: fields,
        active: true,
        responseSchema: {},
        subscriptionBody: {},
        subscriptionName: 'get'
    };

    if (!entity) {
        return res.json({ success: 'Error' });
    }
    const methods = entity.methods;
    if (methods.filter(v => v.type === METHOD_TYPES.GET).length > 0) {
        entity.methods = methods.map(v => {
            if (v.type === METHOD_TYPES.GET) {
                v.filterSchema = fields;
            }
            return v;
        });
    } else {
        entity.methods = entity.methods ? [...entity.methods, newFilterSchema] : [newFilterSchema];
    }

    await entity.save();

    return res.json({ success: 'OK', entity });
}