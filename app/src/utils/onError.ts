import {TRPCClientError} from '@trpc/client';
import {TRPCError} from '@trpc/server';
import Toast from 'react-native-toast-message';

export default function onError(error: unknown) {
  if (error instanceof TRPCClientError) {
    if (error.data.code === 'BAD_REQUEST') {
      // input이 잘못된 bad request는 TRPCError를 message에 json에 배열로 넣어서 반환해줍니다.
      // 따라서 파싱후 전부 토스트로 출력해줍니다.
      const errors = JSON.parse(error.message) as TRPCError[];
      errors.forEach(err =>
        Toast.show({
          type: 'error',
          text1: err.message,
        }),
      );
    } else {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  }
}
