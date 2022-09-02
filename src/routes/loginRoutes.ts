import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
};

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('acesso proibido');
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
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

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && email === 'hi@hi.com' && password && password === 'password') {
    //marcar usuario como logado
    req.session = { loggedIn: true };
    //redirecionar para home page
    res.redirect('/');
  } else {
    res.send('email ou senha invalidos');
    res.redirect('/login');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <p>You are logged in!</p>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <p>You are not logged in!</p>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Bem vindo a area restrita');
});

export { router };