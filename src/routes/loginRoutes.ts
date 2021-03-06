import { Router, Request as ExpressRequest, Response, NextFunction } from 'express';
import { isAuth, postLogin, postLogout } from '../controllers/Auth';
import { getEntities, getEntity, postEntity, postGetFilters, postObjects } from '../controllers/Entity';

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

router.post('/post-objects', postObjects);
router.post('/login', postLogin);
router.post('/postEntity', postEntity);
router.post('/send-get-filters', postGetFilters);
router.get('/isAuth', isAuth);
router.get('/entities', getEntities);
router.get('/entity/:id', getEntity);
router.post('/logout', postLogout);


export { router };
