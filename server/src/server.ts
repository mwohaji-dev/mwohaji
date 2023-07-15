import {createExpressMiddleware} from '@trpc/server/adapters/express';
import express from 'express';
import {config} from 'dotenv';
import {appRouter} from './router';

config();

const app = express();

app.get('/', (_req, res) => res.send('Server is running!'));

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  }),
);

app.listen(process.env.PORT);
