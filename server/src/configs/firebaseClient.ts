// 테스트 용 입니다. 본 코드에서 import 하지 말아주세요.
import {initializeApp} from 'firebase/app';
import {connectAuthEmulator, getAuth} from 'firebase/auth';
import {GOOGLE_CLOUD_PROJECT} from './env';

const testApp = initializeApp({
  projectId: GOOGLE_CLOUD_PROJECT,
  apiKey: 'test-api-key',
});
const testAuth = getAuth(testApp);
connectAuthEmulator(testAuth, 'http://127.0.0.1:9099');

// eslint-disable-next-line import/prefer-default-export
export {testAuth};
