import React, {useCallback, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {Content, trpc} from '../configs/trpc';
import ContentMarker from '../components/ContentMarker';
import {contentTypes} from '../constants/content';
import ContentTypeTag from '../components/ContentTypeTag';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useLocation} from '../contexts/location';

export default function Home(): JSX.Element {
  const mapRef = useRef<MapView>(null);
  const {initLatitude, initLongitude} = useLocation();
  const {top} = useSafeAreaInsets();
  const {data} = trpc.content.list.useQuery();
  const [focusedContentId, setFocusedContentId] = useState<null | string>(null);

  // 클릭한 마커를 포커스함
  const onMarkerPress = useCallback(
    ({id, latitude, longitude}: Content) =>
      () => {
        setFocusedContentId(id);
        mapRef.current?.animateToRegion(
          {
            // TODO 계산
            latitude: latitude - 0.0005,
            longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          },
          250,
        );
      },
    [],
  );
  // 조금이라도 맵이 움직이면 포커스 해제
  const onPanDrag = useCallback(() => setFocusedContentId(null), []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="terrain" // 구글 맵에서 필요없는 정보 제거
        showsBuildings={false} // 22
        showsPointsOfInterest={false} // IOS 맵에서 필요 없는 정보 제거
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        showsIndoors={false}
        showsScale={false}
        focusable={false}
        rotateEnabled={false}
        region={{
          latitude: initLatitude,
          longitude: initLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
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
