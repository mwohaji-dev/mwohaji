import React from 'react';
import {Text, Platform} from 'react-native';
import type {AppRouter} from '../server/src/router';
import {createTRPCReact, httpBatchLink} from '@trpc/react-query';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function TestComponent() {
  const {data} = trpc.hello.greeting.useQuery({name: 'my name'});
  if (!data) {
    return null;
  }
  return <Text>{data}</Text>;
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
