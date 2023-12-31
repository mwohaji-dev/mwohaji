import {z} from 'zod';
import {TRPCError} from '@trpc/server';
import dayjs from 'dayjs';
import prisma from '../configs/prisma';
import {router} from '../configs/trpc';
import {authorizedProcedure} from '../configs/procedure';
import {messaging} from '../configs/firebase';

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
      // 구독작들에게 메시지 보내기
      const {scheduleSubscribers, nickname} =
        await prisma.user.findUniqueOrThrow({
          where: {id},
          include: {
            scheduleSubscribers: {
              include: {
                scheduleSubscriber: {include: {meta: true}},
              },
            },
          },
        });
      await Promise.all(
        scheduleSubscribers
          .filter(({scheduleSubscriber}) => !!scheduleSubscriber.meta)
          .map(async ({scheduleSubscriber: {meta}}) =>
            messaging.send({
              token: meta?.fcmToken as string,
              topic: `@${nickname}님이 새로운 스캐줄을 추가했습니다`,
            }),
          ),
      );

      return schedule;
    }),
  byMe: authorizedProcedure.query(async ({ctx}) => {
    const {id} = ctx.user;

    const now = dayjs();
    const startDate = now.format('YYYY-MM-DD');
    const endDate = now.add(7, 'day').format('YYYY-MM-DD');

    const schedules = await prisma.schedule.findMany({
      where: {
        userId: id,
        date: {
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
      },
    });
    return schedules;
  }),
  remove: authorizedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input}) => {
      const {id: userId} = ctx.user;
      const {id} = input;

      const schedule = await prisma.schedule.findFirst({where: {id, userId}});
      if (!schedule) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: '해당 스케줄이 존재하지 않습니다.',
        });
      }
      await prisma.schedule.delete({where: {id}});
    }),
});
export default scheduleRouter;
