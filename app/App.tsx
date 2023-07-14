/* eslint-disable react-native/no-inline-styles */
import React, {Suspense} from 'react';
import {Text, Platform, View} from 'react-native';
import type {AppRouter} from '../server/src/router';
import {createTRPCReact, httpBatchLink} from '@trpc/react-query';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function TestComponent() {
  const [data] = trpc.hello.greeting.useSuspenseQuery({name: 'my name'});

  return (
    <View style={{marginTop: 100}}>
      <Icon1 name="ab-testing" size={30} color="#900" />
      <Icon2 name="verified-user" size={30} color="#900" />
      <Text>started</Text>
      <Text style={{fontFamily: '1234'}}>스포카한산즈네오</Text>
      <Text style={{fontFamily: 'SpoqaHanSansNeo-Bold'}}>스포카한산즈네오</Text>
      <Text style={{fontFamily: 'SpoqaHanSansNeo-Regular'}}>
        스포카한산즈네오
      </Text>
      <Text>{data}</Text>
    </View>
  );
}

export const trpc = createTRPCReact<AppRouter>();
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url:
        Platform.OS === 'android'
          ? 'http://10.0.2.2:4000/trpc'
          : 'http://localhost:4000/trpc',
      // async headers() {
      // return {
      //   authorization: getAuthCookie(),
      // };
      // },
    }),
  ],
});
// => { useQuery: ..., useMutation: ...}

export default function App(): JSX.Element {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item width={120} height={20} />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={80}
                    height={20}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          }>
          <TestComponent />
        </Suspense>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
