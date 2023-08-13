import request from 'supertest';
import {beforeAll, expect, it} from '@jest/globals';
import MockDate from 'mockdate';
import prisma from '../../configs/prisma';
import app from '../../app';

beforeAll(() => {
  MockDate.set('2023-06-27');
});

afterAll(() => {
  MockDate.reset();
});

it('GET /:nickname', async () => {
  await prisma.user.create({
    data: {
      id: '1',
      nickname: 'user1',
      schedules: {
        createMany: {
          data: [
            {
              id: 'schedule1',
              date: new Date('2023-06-26'),
              startTime: 11,
              endTime: 12,
            },
            {
              id: 'schedule2',
              date: new Date('2023-06-27'),
              startTime: 11,
              endTime: 12,
            },
            {
              id: 'schedule3',
              date: new Date('2023-06-29'),
              startTime: 11,
              endTime: 15,
            },
            {
              id: 'schedule4',
              date: new Date('2023-07-03'),
              startTime: 11,
              endTime: 15,
            },
            {
              id: 'schedule5',
              date: new Date('2023-07-04'),
              startTime: 11,
              endTime: 15,
            },
          ],
        },
      },
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {status, body} = await request(app).get('/users/user1').send();

  expect(status).toBe(200);
  expect(body).toStrictEqual({
    user: {
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      id: '1',
      nickname: 'user1',
      schedules: [
        {
          date: '2023-06-27T00:00:00.000Z',
          endTime: 12,
          id: 'schedule2',
          startTime: 11,
          userId: '1',
        },
        {
          date: '2023-06-29T00:00:00.000Z',
          endTime: 15,
          id: 'schedule3',
          startTime: 11,
          userId: '1',
        },
        {
          date: '2023-07-03T00:00:00.000Z',
          endTime: 15,
          id: 'schedule4',
          startTime: 11,
          userId: '1',
        },
      ],
    },
  });
});
