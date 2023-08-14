import {Request} from 'express';
import {inferAsyncReturnType} from '@trpc/server';
import {auth} from '../configs/firebase';
import findOrCreateUser from '../prisma/findOrCreateUser';

async function parseTokenToUser(idToken?: string) {
  if (!idToken) return null;

  const {uid} = await auth.verifyIdToken(idToken);
  const user = await findOrCreateUser(uid);

  return user;
}

export default async function createContext({req}: {req: Request}) {
  const idToken = req.headers.authorization;

  const user = await parseTokenToUser(idToken);

  return {user};
}

export type Context = inferAsyncReturnType<typeof createContext>;
