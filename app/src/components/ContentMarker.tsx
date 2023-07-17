import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Marker} from 'react-native-maps';
import {Content} from '../configs/trpc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {contentInfo} from '../constants/content';

interface ContentMarkerProps {
  content: Content;
  highlight: boolean;
}

export default function ContentMarker({
  content: {latitude, longitude, id, type},
  highlight,
}: ContentMarkerProps) {
  const {markerIcon, markerStyle} = useMemo(() => contentInfo[type], [type]);
  const extraStyle = useMemo(
    () => ({
      ...(highlight ? styles.markerHighlight : {}),
      ...markerStyle,
    }),
    [markerStyle, highlight],
  );
  const size = useMemo(() => (highlight ? 32 : 24), [highlight]);

  return (
    <Marker key={id} coordinate={{latitude, longitude}}>
      <View style={[styles.marker, extraStyle]}>
        <Icon size={size} color="#fff" name={markerIcon} />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerHighlight: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});