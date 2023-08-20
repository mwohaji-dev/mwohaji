import React, {Suspense, useCallback, useEffect, useMemo} from 'react';
import {Alert, FlatList, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../elements/Text';
import {Schedule, trpc} from '../../configs/trpc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import BasicLoading from '../../components/BasicLoading';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import AddTimeBottomSheet from './AddTimeBottomSheet';
import useModal from '../../hooks/useModal';
import Calandar from '../../components/Calandar';

function Render() {
  const utils = trpc.useContext();
  const [{nickname}] = trpc.user.me.useSuspenseQuery();
  const [schedules] = trpc.schedule.byMe.useSuspenseQuery() as Schedule[][]; // TODO
  const [scheduleSubscribe, {refetch, isRefetching}] =
    trpc.scheduleSubscribe.subscribing.useSuspenseQuery();
  const {mutate: removeSchedule} = trpc.schedule.remove.useMutation({
    onSuccess: () => utils.schedule.byMe.refetch(),
  });
  const {mutate: unsubscribe} = trpc.scheduleSubscribe.unsubscribe.useMutation({
    onSuccess: () => utils.scheduleSubscribe.subscribing.refetch(),
  });

  const onCreateLink = useCallback(() => {
    const link = `mwohaji.com/@${nickname}`;
    Clipboard.setString(link);
    Toast.show({text1: '클립보드에 복사되었습니다.', text2: link});
  }, [nickname]);

  const onPressSchedule = useCallback(
    ({startTime, endTime, id}: Schedule) =>
      Alert.alert(
        `일정 삭제 (${startTime}~${endTime})`,
        '정말로 삭제하시겠습니까?',
        [
          {text: '취소', style: 'cancel'},
          {
            text: '예',
            style: 'destructive',
            onPress: () => removeSchedule({id}),
          },
        ],
      ),
    [removeSchedule],
  );
  const onPressUnsubscribe = useCallback(
    (subscribingId: string) =>
      Alert.alert('구독 취소', '정말로 취소하시겠습니까?', [
        {text: '아니요', style: 'cancel'},
        {
          text: '예',
          style: 'destructive',
          onPress: () => unsubscribe({subscribingId}),
        },
      ]),
    [unsubscribe],
  );

  return (
    <FlatList
      data={scheduleSubscribe}
      onRefresh={refetch}
      refreshing={isRefetching}
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <Text style={styles.nickname}>@{nickname}</Text>
            <Pressable onPress={onCreateLink}>
              <Text style={styles.createLink}>링크 생성</Text>
            </Pressable>
          </View>
          <Calandar schedules={schedules} onPressSchedule={onPressSchedule} />
        </>
      }
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.cardNickname}>
            @{item.scheduleSubscribing.nickname}
          </Text>
          <Pressable onPress={() => onPressUnsubscribe(item.subscribingId)}>
            <Text style={styles.unsubscribe}>구독취소</Text>
          </Pressable>
        </View>
      )}
    />
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
  card: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cardNickname: {
    flex: 1,
    fontSize: 14,
    lineHeight: 24,
    color: '#000',
  },
  unsubscribe: {
    fontSize: 14,
    lineHeight: 24,
    color: '#888',
  },
});
