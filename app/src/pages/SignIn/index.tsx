import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../elements/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {auth} from '../../configs/firebase';
import {useCallback} from 'react';
import {login} from '@react-native-seoul/kakao-login';
import appleAuth from '@invertase/react-native-apple-authentication';

export default function SignIn() {
  const onKakao = useCallback(async () => {
    const {idToken} = await login();
    const credential = auth.OIDCAuthProvider.credential('kakao', idToken);
    auth().signInWithCredential(credential);
  }, []);

  const onApple = useCallback(async () => {
    const {identityToken, nonce} = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL],
    });

    if (!identityToken) {
      throw new Error('애플 로그인 실패');
    }
    const credential = auth.AppleAuthProvider.credential(identityToken, nonce);
    auth().signInWithCredential(credential);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>플레이 캘린더 시작하기</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.kakao]} onPress={onKakao}>
          <Icon name="chat" size={24} color="#000" />
        </Pressable>
        {Platform.OS === 'ios' && (
          <Pressable style={[styles.button, styles.apple]} onPress={onApple}>
            <Icon name="apple" size={24} color="#fff" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#000',
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
