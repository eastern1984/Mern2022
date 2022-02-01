import { Router, Request as ExpressRequest, Response, NextFunction } from 'express';
import { postLogin } from '../controllers/Auth';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

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

/*router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hi@hi.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});*/

router.post('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  return res.json({ result: 'Success' });
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user');
});

export { router };
