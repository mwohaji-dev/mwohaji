import React, {useCallback, useEffect} from 'react';
import {PropsWithChildren, createContext, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, request, PermissionStatus} from 'react-native-permissions';

const permission =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

interface LocationContext {
  permissionStatus?: PermissionStatus;
}

const {Provider} = createContext<LocationContext>({});

export function LocationProvider({children}: PropsWithChildren) {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();

  const requestPermission = useCallback(async () => {
    const newPermissionState = await request(permission);
    setPermissionStatus(newPermissionState);
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return <Provider value={{permissionStatus}}>{children}</Provider>;
}
