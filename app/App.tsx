import React from 'react';
import {Text, Platform, View} from 'react-native';
import type {AppRouter} from '../server/src/router';
import {createTRPCReact, httpBatchLink} from '@trpc/react-query';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

function TestComponent() {
  const {data} = trpc.hello.greeting.useQuery({name: 'my name'});

  return (
    // eslint-disable-next-line react-native/no-inline-styles
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
          ? 'http://10.0.2.2:3000/trpc'
          : 'http://localhost:3000/trpc',
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
        <TestComponent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
