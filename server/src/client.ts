import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './router';


  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/trpc',
      }),
    ],
  });

client.user.list.query().then((user) => console.log(user))
