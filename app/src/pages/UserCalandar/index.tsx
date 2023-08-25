import React from 'react';
import {Schedule, trpc} from '../../configs/trpc';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Suspense, useEffect, useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {RootStackScreenProps} from '../../Navigation';
import BasicLoading from '../../components/BasicLoading';
import Text from '../../elements/Text';
import Calandar from '../../components/Calandar';

function Render({nickname}: {nickname: string}) {
  const [{schedules}] = trpc.user.byNickname.useSuspenseQuery({nickname});
  return <Calandar schedules={schedules as unknown as Schedule[]} />;
}

export interface UserCalandarProps {
  nickname: string;
}

export default function UserCalandar() {
  const {
    params: {nickname},
  } = useRoute<RootStackScreenProps<'UserCalandar'>['route']>();
  const {setOptions} = useNavigation();
  const {data} = trpc.scheduleSubscribe.subscribing.useQuery();
  const {data: user} = trpc.user.byNickname.useQuery({nickname});
  const subscribed = useMemo(
    () =>
      data?.find(
        ({scheduleSubscribing}) => scheduleSubscribing.nickname === nickname,
      ),
    [data, nickname],
  );
  const utils = trpc.useContext();
  const {mutate: subscribe} = trpc.scheduleSubscribe.subscribe.useMutation({
    onSuccess: () => utils.scheduleSubscribe.subscribing.refetch(),
  });
  const {mutate: unsubscribe} = trpc.scheduleSubscribe.unsubscribe.useMutation({
    onSuccess: () => utils.scheduleSubscribe.subscribing.refetch(),
  });
  const right = useMemo(
    () =>
      user &&
      (subscribed ? (
        <Pressable onPress={() => unsubscribe({subscribingId: user.id})}>
          <Text style={styles.unsubscribe}>구독 취소</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => subscribe({subscribingId: user.id})}>
          <Text style={styles.subscribe}>구독</Text>
        </Pressable>
      )),
    [user, subscribed, unsubscribe, subscribe],
  );
  useEffect(
    () => setOptions({title: `@${nickname}`, headerRight: () => right}),
    [nickname, right, setOptions],
  );

  return (
    <Suspense fallback={<BasicLoading />}>
      <Render nickname={nickname} />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  subscribe: {
    fontSize: 14,
    lineHeight: 24,
    color: '#3584FA',

    margin: 16,
  },
  unsubscribe: {
    fontSize: 14,
    lineHeight: 24,
    color: '#888',
    margin: 16,
  },
});
