import {expect} from '@jest/globals';
import prisma from '../../configs/prisma';
import userMetaRouter from '../userMeta';

test('updateFcmToken', async () => {
  const fcmToken = 'test-fcm-token';
  const id = 'test-id';
  const user = await prisma.user.create({data: {id, meta: {create: {}}}});

  await userMetaRouter.createCaller({user}).updateFcmToken({fcmToken});

  const userMeta = await prisma.userMeta.findUnique({where: {userId: id}});
  expect(userMeta?.fcmToken).toBe(fcmToken);
});
