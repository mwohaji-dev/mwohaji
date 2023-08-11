import {Gender} from '@prisma/client';
import request from 'supertest';
import {beforeAll, expect, it} from '@jest/globals';
import prisma from '../../configs/prisma';
import app from '../../app';

beforeAll(async () => {
  await prisma.user.create({
    data: {
      id: '1',
      birth: 2000,
      gender: Gender.male,
      nickname: 'user1',
      scheduleSubscribing: {
        create: {
          scheduleSubscribing: {
            create: {
              id: '2',
              nickname: 'user2',
              birth: 2001,
              gender: Gender.female,
            },
          },
        },
      },
      schedules: {
        createMany: {
          data: [
            {
              id: 'schedule1',
              date: new Date(2023, 6, 28),
              startTime: 11,
              endTime: 12,
            },
            {
              id: 'schedule2',
              date: new Date(2023, 6, 29),
              startTime: 11,
              endTime: 15,
            },
          ],
        },
      },
    },
  });
});

it('GET /:nickname', async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {status, body} = await request(app).get('/users/user1').send();

  expect(status).toBe(200);
  expect(body).toMatchInlineSnapshot(`
    {
      "user": {
        "birth": 2000,
        "gender": "male",
        "id": "1",
        "nickname": "user1",
        "scheduleSubscribing": [
          {
            "scheduleSubscribing": {
              "birth": 2001,
              "gender": "female",
              "id": "2",
              "nickname": "user2",
            },
            "subscriberId": "1",
            "subscribingId": "2",
          },
        ],
        "schedules": [
          {
            "date": "2023-07-27T00:00:00.000Z",
            "endTime": 12,
            "id": "schedule1",
            "startTime": 11,
            "userId": "1",
          },
          {
            "date": "2023-07-28T00:00:00.000Z",
            "endTime": 15,
            "id": "schedule2",
            "startTime": 11,
            "userId": "1",
          },
        ],
      },
    }
  `);
});
