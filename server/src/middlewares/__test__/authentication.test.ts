import {User} from '@prisma/client';
import {router, t} from '../../configs/trpc';
import authorization from '../authentication';

const testUser = {id: 'test'} as User;

const testRouter = router({
  test: t.procedure.use(authorization).query(({ctx}) => ctx.user),
});

test('next', async () => {
  const user = await testRouter.createCaller({user: testUser}).test();

  expect(user).toEqual(testUser);
});

test('error', async () => {
  const caller = testRouter.createCaller({user: null}).test();

  await expect(caller).rejects.toThrow('UNAUTHORIZED');
});
