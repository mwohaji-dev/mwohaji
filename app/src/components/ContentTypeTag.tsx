import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ContentType} from '../configs/trpc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {contentInfo} from '../constants/content';
import Text from '../elements/Text';

interface ContentTypeTagProps {
  contentType: ContentType;
}

export default function ContentTypeTag({contentType}: ContentTypeTagProps) {
  const {markerIcon, name, tagStyle} = useMemo(
    () => contentInfo[contentType],
    [contentType],
  );

  return (
    <View style={[styles.container, tagStyle]}>
      <Icon size={16} color="#fff" name={markerIcon} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 8,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
    lineHeight: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
