import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {QueryClientProvider} from '@tanstack/react-query';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {trpc, trpcClient} from './src/configs/trpc';
import queryClient from './src/configs/reactQuery';
import Home from './src/pages/Home';
import BorderShadowLayout from './src/components/BorderShadowLayout';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LocationProvider} from './src/contexts/location';

function RNApp(): JSX.Element {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <LocationProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <BorderShadowLayout>
              <Home />
            </BorderShadowLayout>
          </SafeAreaProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </LocationProvider>
  );
}

const App = gestureHandlerRootHOC(RNApp);
export default __DEV__
  ? App
  : codePush({checkFrequency: codePush.CheckFrequency.ON_APP_RESUME})(App);
