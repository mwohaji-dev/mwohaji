export interface ContentData {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  naverMapId?: string;
  kakaoMapId?: string;
  appleMapId?: string;
  catchTableLink?: string;
  peopleMin: number;
  peopleMax?: number;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
  scheduleMemo: string;
}

export const contentTypes = ['realtimeHotPlace', 'waitingRestaurant'] as const;
type ContentType = (typeof contentTypes)[number];
export type Content = ContentData & {type: ContentType};
type ContentInfo = {
  [type in ContentType]: {
    name: string;
    link: string;
    markerIcon: string;
    color: string;
    colorLight: string;
  };
};
export const contentInfo: ContentInfo = {
  realtimeHotPlace: {
    name: '실시간 핫플',
    link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOaL3fx3cznQ0EacTllyVNBZXcJZzSxA5FuBa4SETHFTUU-i7qAWcuf0WRVlwJDKr4T_X3jGPbYW-C/pub?gid=0&single=true&output=tsv',
    markerIcon: 'fire',
    color: '#FF1A1A',
    colorLight: 'rgba(255, 26, 26, 0.70)',
  },
  waitingRestaurant: {
    name: '웨이팅 맛집',
    link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOaL3fx3cznQ0EacTllyVNBZXcJZzSxA5FuBa4SETHFTUU-i7qAWcuf0WRVlwJDKr4T_X3jGPbYW-C/pub?gid=2005121968&single=true&output=tsv',
    markerIcon: 'account-multiple-outline',
    color: '#4E55FF',
    colorLight: 'rgba(78, 85, 255, 0.70)',
  },
};
