import {z} from 'zod';
import {TRPCError} from '@trpc/server';
import prisma from '../configs/prisma';
import {router} from '../configs/trpc';
import {authorizedProcedure} from '../configs/procedure';

const scheduleRouter = router({
  add: authorizedProcedure
    .input(
      z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        startTime: z.number().min(0).max(23),
        endTime: z.number().min(1).max(24),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const {id} = ctx.user;
      const {endTime, startTime} = input;
      const date = new Date(input.date);
      // 이미 해당 범위에 스케줄이 있는지 확인
      const isExist = await prisma.schedule.findFirst({
        where: {
          userId: id,
          date,
          OR: [
            {
              AND: [{startTime: {gte: startTime}}, {startTime: {lt: endTime}}],
            },
            {
              AND: [{endTime: {gt: startTime}}, {endTime: {lte: endTime}}],
            },
          ],
        },
      });
      if (isExist) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: '이미 해당 시간에 스케줄이 있습니다.',
        });
      }

      const schedule = await prisma.schedule.create({
        data: {
          date,
          endTime,
          startTime,
          userId: id,
        },
      });
      return schedule;
    }),
});
export default scheduleRouter;
