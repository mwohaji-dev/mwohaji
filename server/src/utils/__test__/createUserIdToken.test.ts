import {auth} from '../../configs/firebase';
import createUserIdToken from '../createUserIdToken';

test('get token', async () => {
  const uid = 'test-uid';
  const idToken = await createUserIdToken(uid);

  const user = await auth.verifyIdToken(idToken);
  expect(user.uid).toBe(uid);
});
