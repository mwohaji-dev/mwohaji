import {expect} from '@jest/globals';
import {TRPCError} from '@trpc/server';
import prisma from '../../configs/prisma';
import userRouter from '../user';
import {auth} from '../../configs/firebase';

test('me', async () => {
  const user = await prisma.user.create({data: {id: 'test-id'}});
  const me = await userRouter.createCaller({user}).me();
  expect(me).toEqual(user);
});

test('editNickname', async () => {
  const user = await prisma.user.create({
    data: {id: 'test-id', nickname: 'beforeNickname'},
  });
  const updatedUser = await userRouter
    .createCaller({user})
    .editNickname({nickname: 'afterNickname'});

  expect(updatedUser).toEqual({
    ...user,
    nickname: 'afterNickname',
    updatedAt: expect.any(Date),
  });
});

test.each([{nickname: 'a'}, {nickname: 'a'.repeat(17)}, {nickname: '@1234'}])(
  'editNickname input',
  async input => {
    const user = await prisma.user.create({data: {id: 'test-id'}});

    async function caller() {
      try {
        await userRouter.createCaller({user}).editNickname(input);
        return null;
      } catch (error) {
        return error as TRPCError;
      }
    }
    const error = await caller();
    if (!error) throw new Error();

    expect(error.code).toBe('BAD_REQUEST');
  },
);

test('withdrawal', async () => {
  const id = 'test-id';
  const user = await prisma.user.create({data: {id}});
  await auth.createUser({uid: id});
  await expect(auth.getUser(id)).resolves.not.toThrow();

  await userRouter.createCaller({user}).withdrawal();

  await expect(auth.getUser(id)).rejects.toThrow();
  await expect(prisma.user.findMany()).resolves.toStrictEqual([]);
});
