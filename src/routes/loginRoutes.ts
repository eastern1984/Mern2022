import { Router, Request as ExpressRequest, Response, NextFunction } from 'express';
import { isAuth, postLogin, postLogout } from '../controllers/Auth';
import { getEntities, getEntity } from '../controllers/Entity';

export interface Request extends ExpressRequest {
  session: any;
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

const router = Router();

router.post('/login', postLogin);
router.get('/isAuth', isAuth);
router.get('/entities', getEntities);
router.get('/entity/:id', getEntity);

router.post('/logout', postLogout);

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user');
});

export { router };
