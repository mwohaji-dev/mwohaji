import {ViewStyle} from 'react-native';
import {ContentType} from '../configs/trpc';

type Content = {
  [type in ContentType]: {
    name: string;
    markerIcon: string;
    markerStyle: ViewStyle;
    tagStyle: ViewStyle;
  };
};

export const contentInfo: Content = {
  realtimeHotPlace: {
    name: '실시간 핫플',
    markerIcon: 'fire',
    markerStyle: {
      backgroundColor: '#FF1A1A',
    },
    tagStyle: {
      backgroundColor: 'rgba(255, 26, 26, 0.70)',
    },
  },
  waitingRestaurant: {
    name: '웨이팅 맛집',
    markerIcon: 'account-multiple-outline',
    markerStyle: {
      backgroundColor: '#4E55FF',
    },
    tagStyle: {
      backgroundColor: 'rgba(78, 85, 255, 0.70)',
    },
  },
};

export const contentTypes: ContentType[] = [
  'realtimeHotPlace',
  'waitingRestaurant',
];
