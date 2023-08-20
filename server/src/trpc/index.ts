import {router} from '../configs/trpc';
import scheduleRouter from './schedule';
import scheduleSubscribeRouter from './scheduleSubscribe';
import userRouter from './user';

export const appRouter = router({
  user: userRouter,
  schedule: scheduleRouter,
  scheduleSubscribe: scheduleSubscribeRouter,
});

export type AppRouter = typeof appRouter;
