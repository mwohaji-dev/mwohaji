import {router} from '../configs/trpc';
import scheduleRouter from './schedule';
import scheduleSubscribeRouter from './scheduleSubscribe';
import userRouter from './user';
import userMetaRouter from './userMeta';

export const appRouter = router({
  user: userRouter,
  userMeta: userMetaRouter,
  schedule: scheduleRouter,
  scheduleSubscribe: scheduleSubscribeRouter,
});

export type AppRouter = typeof appRouter;
