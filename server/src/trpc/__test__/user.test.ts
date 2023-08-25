import {expect} from '@jest/globals';
import {TRPCError} from '@trpc/server';
import _ from 'lodash';
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

test('byNickame', async () => {
  await prisma.user.create({
    data: {
      id: '1',
      nickname: 'user1',
      schedules: {
        createMany: {
          data: [
            {
              id: 'schedule1',
              date: new Date('2023-05-10'),
              startTime: 11,
              endTime: 12,
            },
            {
              id: 'schedule2',
              date: new Date('2023-05-11'),
              startTime: 11,
              endTime: 12,
            },
            {
              id: 'schedule3',
              date: new Date('2023-05-13'),
              startTime: 11,
              endTime: 15,
            },
            {
              id: 'schedule4',
              date: new Date('2023-05-17'),
              startTime: 11,
              endTime: 15,
            },
            {
              id: 'schedule5',
              date: new Date('2023-05-18'),
              startTime: 11,
              endTime: 15,
            },
          ],
        },
      },
    },
  });
  const user = await userRouter
    .createCaller({user: null})
    .byNickname({nickname: 'user1'});

  // createdAt, updatedAt DB에서 generated 되어 mocking이 불가능
  expect(_.omit(user, ['createdAt', 'updatedAt'])).toMatchInlineSnapshot(`
    {
      "deletedAt": null,
      "id": "1",
      "nickname": "user1",
      "schedules": [
        {
          "date": 2023-05-11T00:00:00.000Z,
          "endTime": 12,
          "id": "schedule2",
          "startTime": 11,
          "userId": "1",
        },
        {
          "date": 2023-05-13T00:00:00.000Z,
          "endTime": 15,
          "id": "schedule3",
          "startTime": 11,
          "userId": "1",
        },
        {
          "date": 2023-05-17T00:00:00.000Z,
          "endTime": 15,
          "id": "schedule4",
          "startTime": 11,
          "userId": "1",
        },
      ],
    }
  `);
});

test('editNickname duplicate', async () => {
  const user = await prisma.user.create({data: {id: 'test-id'}});
  await prisma.user.create({
    data: {id: 'dup-id', nickname: 'duplicate'},
  });
  const caller = userRouter
    .createCaller({user})
    .editNickname({nickname: 'duplicate'});

  await expect(caller).rejects.toThrowError('이미 존재하는 닉네임입니다.');
});

test('withdrawal', async () => {
  const id = 'test-id';
  const user = await prisma.user.create({data: {id}});
  await auth.createUser({uid: id});
  await expect(auth.getUser(id)).resolves.not.toThrow();

  await userRouter.createCaller({user}).withdrawal();

  await expect(auth.getUser(id)).rejects.toThrow();
  await expect(prisma.user.findMany()).resolves.toStrictEqual([]);
});
