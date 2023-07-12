import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const helloRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello1 ${input?.name ?? 'World1'}`;
    }),
});

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;