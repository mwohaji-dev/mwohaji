import {expect} from '@jest/globals';
import _ from 'lodash';
import prisma from '../../configs/prisma';
import scheduleRouter from '../schedule';

test('add', async () => {
  const date = '2021-01-01';
  const id = 'test-id';
  const user = await prisma.user.create({data: {id}});

  const result = await scheduleRouter
    .createCaller({user})
    .add({date, startTime: 10, endTime: 12});

  expect(_.pick(result, ['date', 'startTime', 'endTime'])).toStrictEqual({
    date: new Date(date),
    startTime: 10,
    endTime: 12,
  });

  await expect(
    scheduleRouter.createCaller({user}).add({date, startTime: 10, endTime: 12}),
  ).rejects.toThrowError('이미 해당 시간에 스케줄이 있습니다.');
  await expect(
    scheduleRouter.createCaller({user}).add({date, startTime: 9, endTime: 12}),
  ).rejects.toThrowError('이미 해당 시간에 스케줄이 있습니다.');
  await expect(
    scheduleRouter.createCaller({user}).add({date, startTime: 9, endTime: 11}),
  ).rejects.toThrowError('이미 해당 시간에 스케줄이 있습니다.');
  await expect(
    scheduleRouter.createCaller({user}).add({date, startTime: 10, endTime: 13}),
  ).rejects.toThrowError('이미 해당 시간에 스케줄이 있습니다.');
  await expect(
    scheduleRouter.createCaller({user}).add({date, startTime: 11, endTime: 13}),
  ).rejects.toThrowError('이미 해당 시간에 스케줄이 있습니다.');
  await expect(
    scheduleRouter.createCaller({user}).add({date, startTime: 9, endTime: 13}),
  ).rejects.toThrowError('이미 해당 시간에 스케줄이 있습니다.');
  await expect(
    scheduleRouter.createCaller({user}).add({date, startTime: 0, endTime: 23}),
  ).rejects.toThrowError('이미 해당 시간에 스케줄이 있습니다.');

  await expect(
    scheduleRouter.createCaller({user}).add({date, startTime: 9, endTime: 10}),
  ).resolves.not.toThrowError();
  await expect(
    scheduleRouter.createCaller({user}).add({date, startTime: 12, endTime: 13}),
  ).resolves.not.toThrowError();
});

test('my', async () => {
  const user = await prisma.user.create({
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

  const result = await scheduleRouter.createCaller({user}).byMe();
  expect(result).toMatchInlineSnapshot(`
    [
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
    ]
  `);
});

test('remove', async () => {
  const user = await prisma.user.create({
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
          ],
        },
      },
    },
  });

  await expect(
    scheduleRouter.createCaller({user}).remove({id: 'schedule1'}),
  ).resolves.not.toThrowError();
  await expect(
    scheduleRouter.createCaller({user}).remove({id: 'schedule1'}),
  ).rejects.toThrowError('해당 스케줄이 존재하지 않습니다.');
});
