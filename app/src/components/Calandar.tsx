import React from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {useMemo} from 'react';
import dayjs from 'dayjs';
import {DAYS} from '../constants/utils';
import Text from '../elements/Text';
import _ from 'lodash';
import {Schedule} from '../configs/trpc';

const size = (Dimensions.get('window').width - 24 * 2 - 16 * 6) / 7;

interface CalandarProps {
  schedules: Schedule[];
  onPressSchedule?: (schedule: Schedule) => void;
}

export default function Calandar({schedules, onPressSchedule}: CalandarProps) {
  const weeks = useMemo(
    () =>
      _.range(7)
        .map((v, i) => dayjs().add(i, 'day'))
        .map(day => ({
          day: DAYS[day.day()],
          schedules: _.chain(schedules)
            .filter(({date}) => dayjs(date).isSame(day, 'day'))
            .sortBy('startTime')
            .value(),
        })),
    [schedules],
  );

  if (!schedules.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.empty}>등록된 일정이 없습니다.</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.datesContainer}>
        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
        {weeks.map(({day, schedules}, index) => {
          const active = index === 0;
          const backgroundColor = active ? '#3584FA' : '#fff';
          const color = active ? '#fff' : '#888';

          return (
            <View key={day} style={styles.dayContainer}>
              <View style={[styles.dayLogo, {backgroundColor}]}>
                <Text style={[styles.day, {color}]}>{day}</Text>
              </View>
              {schedules.map(schedule => (
                <Pressable
                  key={schedule.id}
                  onPress={() => onPressSchedule && onPressSchedule(schedule)}>
                  <Text style={styles.schedule}>
                    {schedule.startTime}~{schedule.endTime}
                  </Text>
                </Pressable>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  dayLogo: {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  day: {
    fontSize: 14,
    lineHeight: 24,
  },
  schedule: {
    fontSize: 12,
    lineHeight: 24,
    color: '#000',
  },
  emptyContainer: {
    width: '100%',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    fontSize: 14,
    lineHeight: 24,
    color: '#000',
  },
});
