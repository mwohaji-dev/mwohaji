import React, {useEffect, useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';
import {Content} from '../configs/trpc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {contentInfo} from '../constants/content';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface ContentMarkerProps {
  content: Content;
  highlight: boolean;
  onPress: () => void;
}

export default function ContentMarker({
  content: {latitude, longitude, id, type},
  highlight,
  onPress,
}: ContentMarkerProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(highlight ? 1.5 : 1);
  }, [scale, highlight]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const {markerIcon, markerStyle} = useMemo(() => contentInfo[type], [type]);

  return (
    <Marker key={id} coordinate={{latitude, longitude}}>
      <Pressable onPress={onPress}>
        <Animated.View style={[styles.marker, markerStyle, animatedStyle]}>
          <Icon size={24} color="#fff" name={markerIcon} />
        </Animated.View>
      </Pressable>
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
});
