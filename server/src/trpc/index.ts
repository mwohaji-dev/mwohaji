import {router} from '../configs/trpc';
import scheduleRouter from './schedule';
import userRouter from './user';

export const appRouter = router({
  user: userRouter,
  schedule: scheduleRouter,
});

export type AppRouter = typeof appRouter;
