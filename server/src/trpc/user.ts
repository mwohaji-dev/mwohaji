import {z} from 'zod';
import {TRPCError} from '@trpc/server';
import prisma from '../configs/prisma';
import {router} from '../configs/trpc';
import {publicProcedure, authorizedProcedure} from '../configs/procedure';

const userRouter = router({
  me: authorizedProcedure.query(({ctx}) => {
    return ctx.user;
  }),
  detail: publicProcedure
    .input(z.object({id: z.string()}))
    .query(async ({input: {id}}) => {
      const user = await prisma.user.findUnique({
        where: {id},
        include: {
          schedules: true,
          scheduleSubscribing: {
            include: {
              scheduleSubscribing: true,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          message: '유저가 없습니다.',
          code: 'NOT_FOUND',
        });
      }
      return user;
    }),
});
export default userRouter;
