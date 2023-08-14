import {Request} from 'express';
import {signInWithCustomToken} from 'firebase/auth';
import createContext from '../createContext';
import {auth} from '../../configs/firebase';
import prisma from '../../configs/prisma';
import {testAuth} from '../../configs/firebaseClient';

test('with token', async () => {
  const uid = 'test-uid';
  const nickname = 'test-nickname';

  await auth.createUser({uid});
  await auth.getUser(uid);
  const customToken = await auth.createCustomToken(uid);
  const credential = await signInWithCustomToken(testAuth, customToken);
  const token = await credential.user.getIdToken();

  const user = await prisma.user.create({data: {id: uid, nickname}});

  const req = {headers: {authorization: token}} as Request;
  const result = await createContext({req});

  expect(result).toEqual({user});
});

test('without token', async () => {
  const req = {headers: {authorization: undefined}} as Request;
  const result = await createContext({req});

  expect(result).toEqual({user: null});
});
