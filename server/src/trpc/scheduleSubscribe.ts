import {z} from 'zod';
import prisma from '../configs/prisma';
import {router} from '../configs/trpc';
import {authorizedProcedure} from '../configs/procedure';

const scheduleSubscribeRouter = router({
  subscribing: authorizedProcedure.query(async ({ctx}) => {
    const {id} = ctx.user;

    const scheduleSubscribes = await prisma.scheduleSubscribe.findMany({
      where: {subscriberId: id},
      orderBy: {createdAt: 'desc'},
      include: {
        scheduleSubscribing: true,
      },
    });

    return scheduleSubscribes;
  }),
  subscribe: authorizedProcedure
    .input(
      z.object({
        subscribingId: z.string(),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const {id} = ctx.user;
      const {subscribingId} = input;

      const scheduleSubscribe = await prisma.scheduleSubscribe.create({
        data: {
          subscriberId: id,
          subscribingId,
        },
      });

      return scheduleSubscribe;
    }),
  unsubscribe: authorizedProcedure
    .input(
      z.object({
        subscribingId: z.string(),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const {id} = ctx.user;
      const {subscribingId} = input;

      const scheduleSubscribe = await prisma.scheduleSubscribe.delete({
        where: {
          subscribingId_subscriberId: {
            subscriberId: id,
            subscribingId,
          },
        },
      });

      return scheduleSubscribe;
    }),
});

export default scheduleSubscribeRouter;
