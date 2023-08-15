import React, {useEffect, useMemo, useState} from 'react';
import {auth} from '../configs/firebase';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {PropsWithChildren} from 'react';
import SignIn from '../pages/SignIn';
import NicknameEdit from '../pages/NicknameEdit';
import {trpc} from '../configs/trpc';
import Navigation from '../Navigation';

export function Auth({}: PropsWithChildren) {
  const [firebaseUser, setFirebaseUser] =
    useState<FirebaseAuthTypes.User | null>(null);
  const authorized = useMemo(() => !!firebaseUser, [firebaseUser]);
  const {data} = trpc.user.me.useQuery(undefined, {
    enabled: authorized,
  });

  useEffect(() => {
    // 로그인 상태 추적
    const subscriber = auth().onAuthStateChanged(setFirebaseUser);
    return subscriber;
  }, []);

  if (!authorized || !data) {
    return <SignIn />;
  }

  if (data.nickname.length > 16) {
    // 16자 이상이면 기본값이 cuid로 판단하고 닉네임 설정 페이지로 이동
    return <NicknameEdit />;
  }

  return <Navigation />;
}
