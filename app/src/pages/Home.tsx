import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {Content, trpc} from '../configs/trpc';
import ContentMarker from '../components/ContentMarker';
import {contentTypes} from '../constants/content';
import ContentTypeTag from '../components/ContentTypeTag';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useLocation} from '../contexts/location';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Text from '../elements/Text';

export default function Home(): JSX.Element {
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const {defaultLatitude, defaultLongitude, initLatitude, initLongitude} =
    useLocation();
  const {top} = useSafeAreaInsets();
  const {data} = trpc.content.list.useQuery();

  const [focusedContentId, setFocusedContentId] = useState<null | string>(null);
  const [region, setRegion] = useState<Region>({
    latitude: defaultLatitude,
    longitude: defaultLongitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const snapPoints = useMemo(
    // 디자인상 계산된 값
    () => [168 + Dimensions.get('window').width / 3, '100%'],
    [],
  );

  useEffect(() => {
    // 최초 1회 권한을 받고 initCoords를 받으면 적용 시켜줌
    if (initLatitude && initLongitude) {
      mapRef.current?.animateToRegion(
        {
          ...region,
          latitude: initLatitude,
          longitude: initLongitude,
        },
        0,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLatitude, initLongitude]);

  // 클릭한 마커를 포커스함
  const onMarkerPress = useCallback(
    ({id, latitude, longitude}: Content) =>
      () => {
        setFocusedContentId(id);
        bottomSheetRef.current?.present();
        mapRef.current?.animateToRegion(
          {
            // 최소 delta 는 지정해주자
            ...region,
            // TODO 계산
            latitude: latitude - 0.0005,
            longitude,
          },
          250,
        );
      },
    [region],
  );
  // 조금이라도 맵이 움직이면 포커스 해제
  const onPanDrag = useCallback(() => {
    setFocusedContentId(null);
    bottomSheetRef.current?.dismiss();
  }, []);
  const onDissmiss = useCallback(() => setFocusedContentId(null), []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="standard" // 구글 맵에서 필요없는 정보 제거
        showsBuildings={false} // 22
        showsPointsOfInterest={false} // IOS 맵에서 필요 없는 정보 제거
        showsMyLocationButton={false}
        showsUserLocation
        showsCompass={false}
        showsIndoors={false}
        showsScale={false}
        focusable={false}
        rotateEnabled={false}
        initialRegion={region}
        onRegionChange={setRegion}
        onPanDrag={onPanDrag}>
        {data?.map(content => (
          <ContentMarker
            key={content.id}
            content={content}
            highlight={focusedContentId === content.id}
            onPress={onMarkerPress(content)}
          />
        ))}
      </MapView>
      <ScrollView
        contentContainerStyle={styles.contentTypeContentContainer}
        style={[styles.contentTypeContainer, {top}]}
        horizontal>
        {contentTypes.map(contentType => (
          <ContentTypeTag key={contentType} contentType={contentType} />
        ))}
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onDismiss={onDissmiss}
        enablePanDownToClose>
        <Text>Hello</Text>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentTypeContainer: {
    position: 'absolute',
    marginTop: 16,
    left: 0,
    right: 0,
  },
  contentTypeContentContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  map: {
    flex: 1,
  },
});
