import {signInWithCustomToken} from 'firebase/auth';
import {auth} from '../configs/firebase';
import {testAuth} from '../configs/firebaseClient';

// 오직 테스크 코드에서만 사용되는 함수이다.
export default async function createUserIdToken(uid: string) {
  await auth.createUser({uid});
  await auth.getUser(uid);
  const customToken = await auth.createCustomToken(uid);
  const credential = await signInWithCustomToken(testAuth, customToken);
  const idToken = await credential.user.getIdToken();
  return idToken;
}
