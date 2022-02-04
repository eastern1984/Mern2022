import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import md5 from 'md5';

declare module 'express-session' {
    interface SessionData {
        userId: string;
        email: string;
        isLoggedIn: boolean;
    }
}

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;
    const docs = await User.findOne({ email: email });
    if (!docs) {
        return res.json({ error: 'Error', message: 'No user' });
    }
    if (md5(password) === docs.password) {
        req.session.isLoggedIn = true;
        req.session.userId = docs._id.toString();
        req.session.email = docs.email;
        return res.json({ success: 'OK', docs });
    }
    return res.json({ error: 'Error', message: 'Wrong password' });
}

export const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy(err => {
        return res.json({ success: 'OK', err: err });
    });
}

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) {
        return res.json({ success: 'OK', email: req.session.email });
    }
    return res.json({ success: 'OK', email: '' });
}