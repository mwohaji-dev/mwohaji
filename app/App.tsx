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
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

function App(): JSX.Element {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <LocationProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <BorderShadowLayout>
                <Home />
              </BorderShadowLayout>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </LocationProvider>
  );
}

const RNApp = gestureHandlerRootHOC(App);
export default __DEV__
  ? RNApp
  : codePush({checkFrequency: codePush.CheckFrequency.ON_APP_RESUME})(RNApp);
