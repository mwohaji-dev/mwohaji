import React from 'react';
import _ from 'lodash';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface NumberPicker {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export default function NumberPicker({
  min,
  max,
  value,
  onChange,
}: NumberPicker) {
  const numbers = useMemo(() => _.range(min, max + 1), [min, max]);

  return (
    <Picker
      style={styles.container}
      selectedValue={value}
      itemStyle={styles.item} // for ios
      onValueChange={onChange}>
      {numbers.map(number => (
        <Picker.Item
          key={number}
          label={String(number)}
          value={number}
          style={styles.item} // for android
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
  },
  item: {
    fontSize: 32,
    lineHeight: 40,
  },
});
