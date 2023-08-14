import auth from '@react-native-firebase/auth';
import {emulatorURL} from '../constants/server';

if (__DEV__) {
  auth().useEmulator(emulatorURL);
}

export {auth};
