import {TRPCError} from '@trpc/server';
import {middleware} from '../configs/trpc';

const authorization = middleware(({ctx, next}) => {
  const {user} = ctx;
  if (!user) {
    throw new TRPCError({code: 'UNAUTHORIZED'});
  }
  // typing을 위해 다시 ctx에 user를 넣어줍니다.
  return next({ctx: {...ctx, user}});
});

export default authorization;
