import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from './pages/Settings';
import BaseHeader from './components/BaseHeader';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{header: BaseHeader}}>
      <Stack.Screen
        name="Settings"
        options={{title: '설정'}}
        component={Settings}
      />
    </Stack.Navigator>
  );
}
