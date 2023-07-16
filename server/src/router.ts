import {initTRPC} from '@trpc/server';
import {z} from 'zod';
import prisma from './configs/prisma';

const t = initTRPC.create();

const publicProcedure = t.procedure;
const {router} = t;

const contentRouter = router({
  list: publicProcedure.query(async () => {
    const contents = await prisma.content.findMany();

    return contents;
  }),
  detail: publicProcedure
    .input(z.object({id: z.string()}))
    .query(async ({input: {id}}) => {
      const content = await prisma.content.findUnique({
        where: {id},
        include: {mwohajiHashTagedInstagramPosts: true},
      });

      return content;
    }),
});

export const appRouter = router({
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
