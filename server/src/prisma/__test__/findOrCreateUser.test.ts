import {expect} from '@jest/globals';
import prisma from '../../configs/prisma';
import findOrCreateUser from '../findOrCreateUser';

test('findUser', async () => {
  const id = 'find-test-id';
  await prisma.user.create({data: {id}});
  const user = await findOrCreateUser(id);
  expect(user).toStrictEqual({
    id,
    createdAt: expect.any(Date),
    nickname: expect.any(String),
    updatedAt: expect.any(Date),
  });
});

test('createUser', async () => {
  const id = 'create-test-id';
  const user = await findOrCreateUser(id);
  expect(user).toStrictEqual({
    id,
    createdAt: expect.any(Date),
    nickname: expect.any(String),
    updatedAt: expect.any(Date),
  });
});
