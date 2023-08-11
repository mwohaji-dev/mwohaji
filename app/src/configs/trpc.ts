import {createTRPCReact, httpBatchLink} from '@trpc/react-query';
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
      // TODO
      // async headers() {
      // return {
      //   authorization: getAuthCookie(),
      // };
      // },
    }),
  ],
});
