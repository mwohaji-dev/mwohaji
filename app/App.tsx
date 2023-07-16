/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';
import React, {Suspense, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import type {AppRouter} from '../server/src/router';
import {createTRPCReact, httpBatchLink} from '@trpc/react-query';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';

function TestComponent() {
  const [data] = trpc.hello.greeting.useSuspenseQuery({name: 'my name'});

  return (
    <View style={styles.container}>
      <Icon1 name="ab-testing" size={30} color="#900" />
      <Icon2 name="verified-user" size={30} color="#900" />
      <Text>started</Text>
      <Text style={{fontFamily: '1234'}}>스포카한산즈네오</Text>
      <Text style={{fontFamily: 'SpoqaHanSansNeo-Bold'}}>스포카한산즈네오</Text>
      <Text style={{fontFamily: 'SpoqaHanSansNeo-Regular'}}>
        스포카한산즈네오
      </Text>
      <Text>{data}</Text>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: 37.5,
          longitude: 126.9,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
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

function TestApp(): JSX.Element {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

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

const App = gestureHandlerRootHOC(TestApp);
export default __DEV__
  ? App
  : codePush({checkFrequency: codePush.CheckFrequency.ON_APP_RESUME})(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
