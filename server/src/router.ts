import {initTRPC} from '@trpc/server';
import {z} from 'zod';
import prisma from './configs/prisma';

const t = initTRPC.create();

const publicProcedure = t.procedure;
const {router} = t;

const helloRouter = router({
  greeting: publicProcedure
    .input(z.object({name: z.string()}))
    .query(({input}) => `Hello1 ${input?.name ?? 'World1'}`),
});

const userRouter = router({
  list: publicProcedure.query(async () => {
    const users = await prisma.content.findMany();

    return users;
  }),
});

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
