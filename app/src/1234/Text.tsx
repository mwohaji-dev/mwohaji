import React from 'react';
import {Text as BaseText, StyleSheet, TextProps} from 'react-native';

export default function Text(props: TextProps): JSX.Element {
  return <BaseText style={styles.font} {...props} />;
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'SpoqaHanSansNeo',
  },
});
