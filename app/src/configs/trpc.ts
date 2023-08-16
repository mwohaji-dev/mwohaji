import {createTRPCReact, httpBatchLink} from '@trpc/react-query';
import type {AppRouter} from '../../../server/src';
export type {
  Content,
  MwohajiHashTagedInstagramPost,
  ContentType,
  Schedule,
} from '../../../server/src';
import {SERVER_BASE_URL} from '../constants/server';
import {auth} from './firebase';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: SERVER_BASE_URL + '/trpc',
      async headers() {
        const currentUser = auth().currentUser;
        if (!currentUser) {
          return {};
        }
        const authorization = await currentUser.getIdToken();

        return {authorization};
      },
    }),
  ],
});
