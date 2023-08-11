import {Router} from 'express';
import prisma from '../configs/prisma';

const userRouter = Router();

userRouter.get('/:nickname', async (req, res) => {
  const {nickname} = req.params;

  const user = await prisma.user.findUnique({
    where: {nickname},
    include: {
      schedules: true,
    },
  });

  res.json({user});
});

export default userRouter;
