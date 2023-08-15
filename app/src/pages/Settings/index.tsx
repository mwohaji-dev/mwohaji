import React, {useCallback} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../elements/Text';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../configs/firebase';
import {trpc} from '../../configs/trpc';

export default function Settings() {
  const {navigate} = useNavigation();
  const utils = trpc.useContext();

  const {mutate} = trpc.user.withdrawal.useMutation({
    async onSuccess() {
      await auth().signOut();
      utils.user.me.invalidate();
    },
  });

  const onNickname = useCallback(() => navigate('NicknameEdit'), [navigate]);
  const onSignOut = useCallback(() => auth().signOut(), []);
  const onWithdrawal = useCallback(() => {
    Alert.alert('회원탈퇴', '정말로 탈퇴하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '예', style: 'destructive', onPress: () => mutate()},
    ]);
  }, [mutate]);

  return (
    <View>
      <Pressable onPress={onNickname} style={styles.button}>
        <Text style={[styles.buttonText, styles.nickname]}>닉네임 변경</Text>
      </Pressable>
      <Pressable onPress={onSignOut} style={styles.button}>
        <Text style={[styles.buttonText, styles.signOut]}>로그아웃</Text>
      </Pressable>
      <Pressable onPress={onWithdrawal} style={styles.button}>
        <Text style={[styles.buttonText, styles.withdrawal]}>회원탈퇴</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
  },
  nickname: {color: '#888888'},
  signOut: {color: '#3584FA'},
  withdrawal: {color: '#FA3535'},
});
