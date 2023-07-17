import Geolocation from 'react-native-geolocation-service';
import React, {useCallback, useContext, useEffect} from 'react';
import {PropsWithChildren, createContext, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, request, PermissionStatus} from 'react-native-permissions';

const defaultLatitude = 37.5;
const defaultLongitude = 127;
const permission =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

interface LocationContext {
  initLatitude?: number;
  initLongitude?: number;
  permissionStatus?: PermissionStatus;
}

const locationContext = createContext<LocationContext>({
  initLatitude: defaultLatitude,
  initLongitude: defaultLongitude,
});

export function useLocation() {
  const {initLatitude, initLongitude, permissionStatus} =
    useContext(locationContext);

  return {
    defaultLatitude,
    defaultLongitude,
    initLatitude,
    initLongitude,
    permissionStatus,
  };
}

export function LocationProvider({children}: PropsWithChildren) {
  const [initLatitude, setInitLatitude] = useState<number>();
  const [initLongitude, setInitLongitude] = useState<number>();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();

  const requestPermission = useCallback(async () => {
    const newPermissionState = await request(permission);
    setPermissionStatus(newPermissionState);
    if (newPermissionState === 'granted') {
      Geolocation.getCurrentPosition(({coords}) => {
        setInitLatitude(coords.latitude);
        setInitLongitude(coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return (
    <locationContext.Provider
      value={{
        initLatitude,
        initLongitude,
        permissionStatus,
      }}>
      {children}
    </locationContext.Provider>
  );
}
