import {expect} from '@jest/globals';
import tsvToJSON from '../tsvToJSON';

test('tsv to json', () => {
  const tsv = `name	latitude	longitude	address	naverMapId	kakaoMapId	appleMapId	catchTableLink	peopleMin	peopleMax	mon	tue	wed	thu	fri	sat	sun	scheduleMemo
파이브가이즈 강남	37.5011772	127.025626	서울 서초구 강남대로 435 주류성빌딩 1층, 2층	1898369171	1725176424	8895580295817698403	https://app.catchtable.co.kr/ct/shop/songkyeok_hongdae?from=share&type=WAITING	11:00 - 22:00	11:00 - 22:00	11:00 - 22:00	11:00 - 22:00	11:00 - 22:00	11:00 - 22:00	11:00 - 22:00	오전 6시 부터 대기 가능`;

  expect(tsvToJSON(tsv)).toStrictEqual([
    {
      address: '서울 서초구 강남대로 435 주류성빌딩 1층, 2층',
      appleMapId: '8895580295817698403',
      catchTableLink:
        'https://app.catchtable.co.kr/ct/shop/songkyeok_hongdae?from=share&type=WAITING',
      fri: '11:00 - 22:00',
      kakaoMapId: '1725176424',
      latitude: '37.5011772',
      longitude: '127.025626',
      mon: '11:00 - 22:00',
      name: '파이브가이즈 강남',
      naverMapId: '1898369171',
      peopleMax: '11:00 - 22:00',
      peopleMin: '11:00 - 22:00',
      sat: '오전 6시 부터 대기 가능',
      thu: '11:00 - 22:00',
      tue: '11:00 - 22:00',
      wed: '11:00 - 22:00',
    },
  ]);
});
