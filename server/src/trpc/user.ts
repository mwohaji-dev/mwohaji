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
      const user = await prisma.user.update({
        where: {id},
        data: {nickname},
      });
      return user;
    }),
});
export default userRouter;
