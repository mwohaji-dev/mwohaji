import {Platform} from 'react-native';
import deviceInfoModule from 'react-native-device-info';

// 로컬에서 실제 서버에 연결해볼때 on 할 것
const PROD_TEST_MODE = false;
// yarn localip를 통해 가져올 수 있습니다.
// 실제 디바이스에서 사용할때 사용해주세요.
const IP_ADDRESS = '172.20.10.3';

export const SERVER_BASE_URL = (() => {
  if (!__DEV__ || PROD_TEST_MODE) {
    return 'https://server-na5txsvfxq-du.a.run.app';
  }
  if (!deviceInfoModule.isEmulatorSync()) {
    return `http://${IP_ADDRESS}:4000`;
  }
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000';
  } else {
    return 'http://localhost:4000';
  }
})();

export const emulatorURL =
  Platform.OS === 'android' ? 'http://10.0.2.2:9099' : 'http://127.0.0.1:9099';
