import {expect} from '@jest/globals';
import _ from 'lodash';
import prisma from '../../configs/prisma';
import scheduleSubscribe from '../scheduleSubscribe';

test('subscribing', async () => {
  const user1 = await prisma.user.create({data: {id: '1', nickname: 'user1'}});
  const user2 = await prisma.user.create({data: {id: '2', nickname: 'user2'}});
  await prisma.scheduleSubscribe.create({
    data: {
      subscriberId: user1.id,
      subscribingId: user2.id,
      createdAt: new Date('2021-01-01'),
    },
  });
  const {scheduleSubscribing} = await prisma.user.findUniqueOrThrow({
    where: {id: user1.id},
    include: {scheduleSubscribing: true},
  });
  expect(scheduleSubscribing).toHaveLength(1);

  const result = await scheduleSubscribe
    .createCaller({user: user1})
    .subscribing();

  expect(result).toMatchInlineSnapshot(`[]`);
});

test('subscribe', async () => {
  const user1 = await prisma.user.create({data: {id: '1', nickname: 'user1'}});
  const user2 = await prisma.user.create({data: {id: '2', nickname: 'user2'}});

  const result = await scheduleSubscribe
    .createCaller({user: user1})
    .subscribe({subscribingId: user2.id});

  expect(_.omit(result, 'createdAt')).toMatchInlineSnapshot(`
    {
      "subscriberId": "1",
      "subscribingId": "2",
    }
  `);
  const {scheduleSubscribing} = await prisma.user.findUniqueOrThrow({
    where: {id: user1.id},
    include: {scheduleSubscribing: true},
  });
  expect(scheduleSubscribing).toHaveLength(1);
});

test('unsubscribe', async () => {
  const user1 = await prisma.user.create({data: {id: '1', nickname: 'user1'}});
  const user2 = await prisma.user.create({data: {id: '2', nickname: 'user2'}});

  await scheduleSubscribe
    .createCaller({user: user1})
    .subscribe({subscribingId: user2.id});
  const result = await scheduleSubscribe
    .createCaller({user: user1})
    .unsubscribe({subscribingId: user2.id});

  expect(_.omit(result, 'createdAt')).toMatchInlineSnapshot(`
    {
      "subscriberId": "1",
      "subscribingId": "2",
    }
  `);
  const {scheduleSubscribing} = await prisma.user.findUniqueOrThrow({
    where: {id: user1.id},
    include: {scheduleSubscribing: true},
  });
  expect(scheduleSubscribing).toHaveLength(0);
});
