import React, {useEffect, useMemo, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {PropsWithChildren} from 'react';
import SignIn from '../pages/SignIn';
import NicknameEdit from '../pages/NicknameEdit';

export function Auth({}: PropsWithChildren) {
  const [firebaseUser, setFirebaseUser] =
    useState<FirebaseAuthTypes.User | null>(null);
  const authorized = useMemo(() => !!firebaseUser, [firebaseUser]);

  useEffect(() => {
    // 로그인 상태 추적
    const subscriber = auth().onAuthStateChanged(setFirebaseUser);
    return subscriber;
  }, []);

  if (!authorized) {
    return <SignIn />;
  }

  return <NicknameEdit />;
}
