import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {trpc} from '../configs/trpc';
import ContentMarker from '../Components/ContentMarker';
import {contentTypes} from '../constants/content';
import ContentTypeTag from '../Components/ContentTypeTag';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function Home(): JSX.Element {
  const {top} = useSafeAreaInsets();
  const {data} = trpc.content.list.useQuery();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType="terrain"
        region={{
          latitude: 37.5011772,
          longitude: 127.025626,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsPointsOfInterest={false}>
        {data?.map(content => (
          <ContentMarker key={content.id} content={content} highlight={false} />
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
