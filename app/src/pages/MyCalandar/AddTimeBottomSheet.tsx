import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Text from '../../elements/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import {DAYS} from '../../constants/utils';
import _ from 'lodash';
import NumberPicker from '../../components/NumberPicker';
import {trpc} from '../../configs/trpc';

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

  const utils = trpc.useContext();
  const {mutate} = trpc.schedule.add.useMutation({
    onSuccess: () => {
      utils.schedule.invalidate();
      onClose();
    },
  });

  const weeks = useMemo(
    () =>
      _.range(7)
        .map((v, i) => dayjs().add(i, 'day'))
        .map(day => ({day: DAYS[day.day()], date: day.toDate()})),
    [],
  );
  const [acitveDate, setActiveDate] = useState(weeks[0].date);
  const [startTime, setStartTime] = useState(11);
  const [endTime, setEndTime] = useState(13);
  const addable = useMemo(
    () => acitveDate && startTime < endTime,
    [acitveDate, startTime, endTime],
  );
  const addColor = useMemo(() => (addable ? '#3584FA' : '#888'), [addable]);

  const onAdd = useCallback(() => {
    if (!addable) {
      return;
    }
    mutate({
      date: dayjs(acitveDate).format('YYYY-MM-DD'),
      startTime,
      endTime,
    });
  }, [addable, acitveDate, startTime, endTime, mutate]);

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
        <Pressable onPress={onAdd}>
          <Text style={[styles.add, {color: addColor}]}>추가</Text>
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
      <View style={styles.timePicker}>
        <NumberPicker
          min={0}
          max={23}
          value={startTime}
          onChange={setStartTime}
        />
        <Text style={styles.time}>~</Text>
        <NumberPicker min={1} max={24} value={endTime} onChange={setEndTime} />
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
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    lineHeight: 56,
    fontSize: 32,
    color: '#000',
  },
  startTime: {
    flex: 1,
    alignItems: 'flex-end',
  },
  endTime: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
