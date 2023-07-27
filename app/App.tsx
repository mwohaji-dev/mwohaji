import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';
import React, {useCallback, useEffect} from 'react';
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
import {useMMKVNumber} from 'react-native-mmkv';
import InAppReview from 'react-native-in-app-review';
import {ContentsProvider} from './src/contexts/contents';

function App(): JSX.Element {
  const [loadCount = 1, setLoadCount] = useMMKVNumber('load');

  const requestInAppRating = useCallback(async () => {
    if (__DEV__) {
      // DEV 환경에서는 무시
      return;
    }
    // 매 10회 로딩마다 별점 요청
    setLoadCount(loadCount + 1);
    if (loadCount % 10 === 0) {
      await InAppReview.RequestInAppReview();
    }
  }, [loadCount, setLoadCount]);

  useEffect(() => {
    RNBootSplash.hide({fade: true});
    requestInAppRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocationProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ContentsProvider>
            <SafeAreaProvider>
              <BorderShadowLayout>
                <BottomSheetModalProvider>
                  <Home />
                </BottomSheetModalProvider>
              </BorderShadowLayout>
            </SafeAreaProvider>
          </ContentsProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </LocationProvider>
  );
}

const RNApp = gestureHandlerRootHOC(App);
export default __DEV__
  ? RNApp
  : codePush({checkFrequency: codePush.CheckFrequency.ON_APP_RESUME})(RNApp);
