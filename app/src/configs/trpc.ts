import {createTRPCReact, httpBatchLink} from '@trpc/react-query';
import auth from '@react-native-firebase/auth';
import type {AppRouter} from '../../../server/src';
export type {
  Content,
  MwohajiHashTagedInstagramPost,
  ContentType,
} from '../../../server/src';
import {SERVER_BASE_URL} from '../constants/server';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: SERVER_BASE_URL + '/trpc',
      async headers() {
        const authorization = await auth().currentUser?.getIdToken();
        return {authorization};
      },
    }),
  ],
});
