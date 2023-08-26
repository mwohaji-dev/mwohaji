import {z} from 'zod';
import prisma from '../configs/prisma';
import {router} from '../configs/trpc';
import {authorizedProcedure} from '../configs/procedure';

const userMetaRouter = router({
  updateFcmToken: authorizedProcedure
    .input(z.object({fcmToken: z.string()}))
    .mutation(async ({ctx, input}) => {
      const {fcmToken} = input;
      const {id} = ctx.user;

      await prisma.userMeta.update({
        where: {userId: id},
        data: {fcmToken},
      });
    }),
});
export default userMetaRouter;
