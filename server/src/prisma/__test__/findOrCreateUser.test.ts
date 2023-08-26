import {expect} from '@jest/globals';
import prisma from '../../configs/prisma';
import findOrCreateUser from '../findOrCreateUser';

test('findUser', async () => {
  const id = 'find-test-id';
  await prisma.user.create({data: {id}});
  const user = await findOrCreateUser(id);
  expect(user.id).toBe(id);
});

test('createUser', async () => {
  const id = 'create-test-id';
  const user = await findOrCreateUser(id);
  expect(user.id).toBe(id);

  const meta = await prisma.userMeta.findUnique({where: {userId: user.id}});
  expect(meta).toMatchInlineSnapshot(`
    {
      "fcmToken": null,
      "userId": "create-test-id",
    }
  `);
});
