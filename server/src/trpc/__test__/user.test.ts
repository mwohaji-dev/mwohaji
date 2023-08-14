import {appRouter} from '..';
import prisma from '../../configs/prisma';

test('me', async () => {
  const user = await prisma.user.create({data: {id: 'test-id'}});
  const me = await appRouter.createCaller({user}).user.me();
  expect(me).toEqual(user);
});
