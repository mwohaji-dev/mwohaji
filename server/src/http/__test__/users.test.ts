import request from 'supertest';
import _ from 'lodash';
import {expect, it} from '@jest/globals';
import prisma from '../../configs/prisma';
import app from '../../app';

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {status, body} = await request(app).get('/users/user1').send();

  expect(status).toBe(200);
  // createdAt, updatedAt DB에서 generated 되어 mocking이 불가능
  expect(_.omit(body, ['createdAt', 'updatedAt'])).toMatchInlineSnapshot(`
    {
      "user": {
        "createdAt": "2023-08-15T11:43:07.786Z",
        "deletedAt": null,
        "id": "1",
        "nickname": "user1",
        "schedules": [
          {
            "date": "2023-05-11T00:00:00.000Z",
            "endTime": 12,
            "id": "schedule2",
            "startTime": 11,
            "userId": "1",
          },
          {
            "date": "2023-05-13T00:00:00.000Z",
            "endTime": 15,
            "id": "schedule3",
            "startTime": 11,
            "userId": "1",
          },
          {
            "date": "2023-05-17T00:00:00.000Z",
            "endTime": 15,
            "id": "schedule4",
            "startTime": 11,
            "userId": "1",
          },
        ],
        "updatedAt": "2023-08-15T11:43:07.786Z",
      },
    }
  `);
});
