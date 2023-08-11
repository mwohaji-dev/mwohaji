import {Router} from 'express';
import dayjs from 'dayjs';
import prisma from '../configs/prisma';

const userRouter = Router();

userRouter.get('/:nickname', async (req, res) => {
  const {nickname} = req.params;
  // 시간 범위 미리 계산
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
  res.json({user});
});

export default userRouter;
