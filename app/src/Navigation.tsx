import React from 'react';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import Settings from './pages/Settings';
import BaseHeader from './components/BaseHeader';
import NicknameEdit from './pages/NicknameEdit';
import MyCalandar from './pages/MyCalandar';
import UserCalandar from './pages/UserCalandar';
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['https://mwohaji.com', 'mwohaji://'],
  config: {
    initialRouteName: 'MyCalandar',
    screens: {
      UserCalandar: 'user/:nickname',
    },
  },
};

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
    <NavigationContainer
      linking={linking}
      theme={{
        colors: {
          ...DefaultTheme.colors,
          background: '#fff',
        },
        dark: false,
      }}>
      <Stack.Navigator
        initialRouteName="MyCalandar"
        screenOptions={{header: BaseHeader}}>
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
    </NavigationContainer>
  );
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
