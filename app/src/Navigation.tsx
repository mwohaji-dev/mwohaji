import React from 'react';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import Settings from './pages/Settings';
import BaseHeader from './components/BaseHeader';
import NicknameEdit from './pages/NicknameEdit';
import MyCalandar from './pages/MyCalandar';
import UserCalandar from './pages/UserCalandar';

type RootStackParamList = {
  MyCalandar: undefined;
  UserCalandar: {nickname: string};
  Settings: undefined;
  NicknameEdit: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{header: BaseHeader}}>
      <Stack.Screen
        name="MyCalandar"
        options={{title: '플레이 캘린더'}}
        component={MyCalandar}
      />
      <Stack.Screen name="UserCalandar" component={UserCalandar} />
      <Stack.Screen
        name="Settings"
        options={{title: '설정'}}
        component={Settings}
      />
      <Stack.Screen
        name="NicknameEdit"
        options={{title: '닉네임 수정'}}
        component={NicknameEdit}
      />
    </Stack.Navigator>
  );
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
