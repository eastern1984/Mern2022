"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Auth_1 = require("../controllers/Auth");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
var router = express_1.Router();
exports.router = router;
router.post('/login', Auth_1.postLogin);
/*router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hi@hi.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});*/
router.post('/logout', function (req, res) {
    req.session = undefined;
    return res.json({ result: 'Success' });
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route, logged in user');
});
