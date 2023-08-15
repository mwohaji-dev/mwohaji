import React, {useMemo, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Text from '../../elements/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import {DAYS} from '../../constants/utils';
import _ from 'lodash';

const size = (Dimensions.get('window').width - 24 * 2 - 16 * 6) / 7;

interface AddTimeBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddTimeBottomSheet({
  visible,
  onClose,
}: AddTimeBottomSheetProps) {
  const {bottom} = useSafeAreaInsets();
  const weeks = useMemo(
    () =>
      _.range(7)
        .map((v, i) => dayjs().add(i, 'day'))
        .map(day => ({day: DAYS[day.day()], date: day.toDate()})),
    [],
  );
  const [acitveDate, setActiveDate] = useState(weeks[0].date);

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={[styles.container, {paddingBottom: bottom + 16}]}
      onBackdropPress={onClose}
      useNativeDriver>
      <View style={styles.header}>
        <Text style={styles.title}>놀 수 있는 시간 추가</Text>
        <Pressable>
          <Text style={styles.add}>추가</Text>
        </Pressable>
      </View>
      <View style={styles.datesContainer}>
        {weeks.map(({date, day}) => {
          const active = date === acitveDate;
          const backgroundColor = active ? '#3584FA' : '#fff';
          const color = active ? '#fff' : '#888';

          return (
            <Pressable
              key={day}
              onPress={() => setActiveDate(date)}
              style={[styles.dayButton, {backgroundColor}]}>
              <Text style={[styles.day, {color}]}>{day}</Text>
            </Pressable>
          );
        })}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  add: {
    fontSize: 14,
    lineHeight: 24,
    color: '#3584FA',
  },
  datesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  dayButton: {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    fontSize: 14,
    lineHeight: 24,
  },
});
