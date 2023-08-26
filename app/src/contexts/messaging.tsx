import {PropsWithChildren, useCallback, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {trpc} from '../configs/trpc';
import {PermissionsAndroid, Platform} from 'react-native';

export function MessagingProvider({children}: PropsWithChildren) {
  const {mutate} = trpc.userMeta.updateFcmToken.useMutation();

  const requestUserPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      await messaging().requestPermission();
    } else {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    try {
      const fcmToken = await messaging().getToken();
      mutate({fcmToken});
    } catch (error) {
      // TODO
    }
  }, [mutate]);

  useEffect(() => {
    requestUserPermission();
    return messaging().onTokenRefresh(fcmToken => mutate({fcmToken}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
