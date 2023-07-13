import {createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import type {AppRouter} from './router';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

const test = async () => {
  const users = await client.user.list.query();
  // eslint-disable-next-line no-console
  console.log(users);
};

// eslint-disable-next-line no-void
void test();
