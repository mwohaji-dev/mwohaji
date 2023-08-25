import {z} from 'zod';
import {TRPCError} from '@trpc/server';
import cuid from 'cuid';
import dayjs from 'dayjs';
import prisma from '../configs/prisma';
import {router} from '../configs/trpc';
import {publicProcedure, authorizedProcedure} from '../configs/procedure';
import {auth} from '../configs/firebase';

const userRouter = router({
  me: authorizedProcedure.query(({ctx}) => {
    return ctx.user;
  }),
  byNickname: publicProcedure
    .input(z.object({nickname: z.string()}))
    .query(async ({input}) => {
      const {nickname} = input;

      const now = dayjs();
      const startDate = now.format('YYYY-MM-DD');
      const endDate = now.add(7, 'day').format('YYYY-MM-DD');

      const user = await prisma.user.findUnique({
        where: {nickname},
        include: {
          schedules: {
            where: {
              date: {
                gte: new Date(startDate),
                lt: new Date(endDate),
              },
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
  editNickname: authorizedProcedure
    .input(
      z.object({
        nickname: z
          .string()
          .min(4, '닉네임은 최소 4글자 여야 합니다.')
          .max(16, '닉네임은 최대 16글자 까지 가능합니다.')
          .regex(
            /^[a-zA-Z0-9-_]+$/,
            '닉네임은 영문, 숫자, -, _ 만 가능합니다.',
          ),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const {id} = ctx.user;
      const {nickname} = input;
      const result = prisma.$transaction(async t => {
        const prevUser = await t.user.findUnique({where: {nickname}});
        if (prevUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: '이미 존재하는 닉네임입니다.',
          });
        }

        const user = await t.user.update({
          where: {id},
          data: {nickname},
        });
        return user;
      });

      return result;
    }),
  withdrawal: authorizedProcedure.mutation(async ({ctx}) => {
    const {id} = ctx.user;
    // soft delete
    // deletedAt을 추가하고 모든 개인정보를 cuid로 바꾼다.
    await prisma.$transaction(async t => {
      // firebase에서도 제거해준다.
      await auth.deleteUser(id);
      await t.user.update({
        where: {id},
        data: {
          id: cuid(),
          nickname: cuid(),
          deletedAt: new Date(),
        },
      });
    });
  }),
});
export default userRouter;
