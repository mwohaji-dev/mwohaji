import React, {Suspense, useCallback, useEffect, useMemo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Text from '../../elements/Text';
import {trpc} from '../../configs/trpc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import BasicLoading from '../../components/BasicLoading';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import AddTimeBottomSheet from './AddTimeBottomSheet';
import useModal from '../../hooks/useModal';

function Render() {
  const [{nickname}] = trpc.user.me.useSuspenseQuery();

  const onCreateLink = useCallback(() => {
    const link = `mwohaji.com/@${nickname}`;
    Clipboard.setString(link);
    Toast.show({text1: '클립보드에 복사되었습니다.', text2: link});
  }, [nickname]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.nickname}>@{nickname}</Text>
        <Pressable onPress={onCreateLink}>
          <Text style={styles.createLink}>링크 생성</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function MyCalandar() {
  const {bottom} = useSafeAreaInsets();
  const {setOptions, navigate} = useNavigation();
  const [visible, open, close] = useModal();
  const right = useMemo(
    () => (
      <Pressable style={styles.right} onPress={() => navigate('Settings')}>
        <Icon name="tune" color="#888" size={24} />
      </Pressable>
    ),
    [navigate],
  );
  useEffect(() => setOptions({headerRight: () => right}), [right, setOptions]);

  return (
    <>
      <Suspense fallback={<BasicLoading />}>
        <Render />
      </Suspense>
      <Pressable onPress={open} style={[styles.fab, {bottom: bottom + 24}]}>
        <Icon name="plus" size={24} color="#fff" />
      </Pressable>
      <AddTimeBottomSheet visible={visible} onClose={close} />
    </>
  );
}

const styles = StyleSheet.create({
  right: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    backgroundColor: '#3584FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nickname: {
    color: '#000',
    fontSize: 14,
    lineHeight: 24,
    flex: 1,
    fontWeight: 'bold',
  },
  createLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#3584FA',
  },
});
