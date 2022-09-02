import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

//captura uma rota vindo de outro arquivo
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [''] }));
app.use(router);

app.listen(3000, () => {
  console.log('ouvindo a porta 3000');
});