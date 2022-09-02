"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
;
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('acesso proibido');
}
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
    res.send(`
    <form method="POST">
      <div>
        <label>email</label>
        <input name="email" />
      </div>
      <div>
        <label>password</label>
        <input name="password" type="password" />
        <button>Submit</button>
      </div>      
    </form>
  `);
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && email === 'hi@hi.com' && password && password === 'password') {
        //marcar usuario como logado
        req.session = { loggedIn: true };
        //redirecionar para home page
        res.redirect('/');
    }
    else {
        res.send('email ou senha invalidos');
        res.redirect('/login');
    }
});
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
      <div>
        <p>You are logged in!</p>
        <a href="/logout">Logout</a>
      </div>
    `);
    }
    else {
        res.send(`
      <div>
        <p>You are not logged in!</p>
        <a href="/login">Login</a>
      </div>
    `);
    }
});
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send('Bem vindo a area restrita');
});
