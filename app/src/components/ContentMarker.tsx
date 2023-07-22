import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';
import {Content} from '../configs/trpc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {contentInfo} from '../constants/content';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedMarker = Animated.createAnimatedComponent(Marker);

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
    <AnimatedMarker
      key={id}
      style={[styles.marker, styles.markerHighlight]}
      coordinate={{latitude, longitude}}
      onPress={onPress}>
      <Animated.View style={[styles.pin, markerStyle, animatedStyle]}>
        <Icon size={24} color="#fff" name={markerIcon} />
      </Animated.View>
    </AnimatedMarker>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 32 * 1.5,
    height: 32 * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerHighlight: {
    width: 32 * 1.5,
    height: 32 * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
