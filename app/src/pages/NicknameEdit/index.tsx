import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import Text from '../../elements/Text';
import {trpc} from '../../configs/trpc';
import {useNavigation} from '@react-navigation/native';

export default function NicknameEdit() {
  const {setOptions, goBack} = useNavigation();
  const [nickname, setNickname] = useState('');
  const utils = trpc.useContext();
  const {mutate} = trpc.user.editNickname.useMutation({
    onSuccess: () => {
      utils.user.me.fetch();
      goBack();
    },
  });

  const onChangeText = useCallback((text: string) => {
    const regex = /[^a-zA-Z0-9\-_]+/g;
    setNickname(text.replace(regex, '')); // 영문, 숫자, -, _ 만 허용
  }, []);

  const onConfirm = useCallback(() => mutate({nickname}), [mutate, nickname]);

  const headerRight = useMemo(
    () => (
      <Pressable onPress={onConfirm} style={[styles.confirmButton]}>
        <Text style={styles.confirm}>완료</Text>
      </Pressable>
    ),
    [onConfirm],
  );

  useEffect(
    () => setOptions({headerRight: () => headerRight}),
    [headerRight, setOptions],
  );

  return (
    <View style={styles.container}>
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
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirm: {
    color: '#3584FA',
    lineHeight: 24,
    fontSize: 14,
  },
});
