import React from 'react';
import {StyleSheet, View} from 'react-native';
import Map from 'react-native-maps';

export default function Home(): JSX.Element {
  return (
    <View style={styles.container}>
      <Map
        style={styles.map}
        region={{
          latitude: 37.5011772,
          longitude: 127.025626,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsPointsOfInterest={false}
      />
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
