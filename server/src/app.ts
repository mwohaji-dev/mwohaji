import {createExpressMiddleware} from '@trpc/server/adapters/express';
import express from 'express';

import morgan from 'morgan';
import {appRouter} from './trpc';
import userRouter from './http/user';
import createContext from './middlewares/createContext';
import {NODE_ENV} from './configs/env';

const app = express();

if (NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}
app.get('/', (_req, res) => res.send('Server is running!'));
app.use('/users', userRouter);

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export default app;
