import React, {PropsWithChildren} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

export default function BorderShadowLayout({children}: PropsWithChildren) {
  return (
    <View style={styles.container}>
      {children}
      <View style={[StyleSheet.absoluteFill, styles.shadow]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    pointerEvents: 'none',
    ...(Platform.OS === 'ios'
      ? {
          borderRadius: 45,
          borderWidth: 24,
          margin: -24,
          shadowColor: '#000',
          shadowRadius: 12,
          shadowOpacity: 1,
        }
      : {
          // TODO
        }),
  },
});
