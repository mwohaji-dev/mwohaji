import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import Text from '../../elements/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {trpc} from '../../configs/trpc';

export default function NicknameInit() {
  const {top} = useSafeAreaInsets();
  const [nickname, setNickname] = useState('');
  const utils = trpc.useContext();
  const {mutate} = trpc.user.editNickname.useMutation({
    onSuccess: () => utils.user.me.fetch(),
  });

  const onChangeText = useCallback((text: string) => {
    const regex = /[^a-zA-Z0-9\-_]+/g;
    setNickname(text.replace(regex, '')); // 영문, 숫자, -, _ 만 허용
  }, []);

  const onConfirm = useCallback(() => mutate({nickname}), [mutate, nickname]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onConfirm}
        style={[styles.confirmButton, {top: top + 16}]}>
        <Text style={styles.confirm}>완료</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력해주세요 (영문, 숫자, -, _)"
        placeholderTextColor="#888"
        textAlign="center"
        value={nickname}
        onChangeText={onChangeText}
        maxLength={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  confirmButton: {
    position: 'absolute',
    right: 16,
  },
  confirm: {
    color: '#3584FA',
    lineHeight: 24,
    fontSize: 14,
  },
});
