import {createExpressMiddleware} from '@trpc/server/adapters/express';
import express from 'express';

import {appRouter} from './trpc';
import userRouter from './http/user';

const app = express();

app.get('/', (_req, res) => res.send('Server is running!'));
app.use('/users', userRouter);

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  }),
);

export default app;
