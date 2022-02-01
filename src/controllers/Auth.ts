import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import md5 from 'md5';


export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;
    const docs = await User.find({ email: { $eq: email } });
    if (!docs) {
        return res.json({ success: 'Error', message: 'No user' });
    }
    if (md5(password) === docs[0].password) {
        return res.json({ success: 'OK', docs });
    }
    return res.json({ success: 'Error', message: 'Wrong password' });
}