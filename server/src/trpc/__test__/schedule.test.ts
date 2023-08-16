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
