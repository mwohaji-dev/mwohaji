import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Text from '../../elements/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCallback} from 'react';

export default function SignIn() {
  const onKakao = useCallback(() => {}, []);

  const onApple = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>플레이 캘린더 시작하기</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.kakao]} onPress={onKakao}>
          <Icon name="chat" size={24} />
        </Pressable>
        <Pressable style={[styles.button, styles.apple]} onPress={onApple}>
          <Icon name="apple" size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakao: {
    backgroundColor: '#FEE500',
  },
  apple: {
    backgroundColor: '#000000',
  },
});
