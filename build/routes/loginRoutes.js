"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var Auth_1 = require("../controllers/Auth");
var Entity_1 = require("../controllers/Entity");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
var router = (0, express_1.Router)();
exports.router = router;
router.post('/login', Auth_1.postLogin);
router.post('/postEntity', Entity_1.postEntity);
router.get('/isAuth', Auth_1.isAuth);
router.get('/entities', Entity_1.getEntities);
router.get('/entity/:id', Entity_1.getEntity);
router.post('/logout', Auth_1.postLogout);
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route, logged in user');
});
