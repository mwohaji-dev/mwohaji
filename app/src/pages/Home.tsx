import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {trpc} from '../configs/trpc';
import ContentMarker from '../Components/ContentMarker';

export default function Home(): JSX.Element {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
