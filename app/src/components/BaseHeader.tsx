import React, {useMemo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../elements/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackHeaderProps} from '@react-navigation/stack';

export default function BaseHeader({
  navigation,
  options: {title, headerRight},
  back,
}: StackHeaderProps) {
  const {goBack} = navigation;
  const marginLeft = useMemo(() => (back ? 0 : 16), [back]);
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {height: 56 + top, paddingTop: top}]}>
      {back && (
        <Pressable style={styles.goBack} onPress={goBack}>
          <Icon name="chevron-left" color="#888" size={24} />
        </Pressable>
      )}
      <Text style={[styles.title, {marginLeft}]}>{title}</Text>
      {headerRight && headerRight({})}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBack: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#000',
    flex: 1,
  },
});
