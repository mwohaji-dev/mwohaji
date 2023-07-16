/* eslint-disable no-console */
import {createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import type {AppRouter} from './router';
import prisma from './configs/prisma';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://server-na5txsvfxq-du.a.run.app/trpc',
    }),
  ],
});

const test = async () => {
  const greeting = await client.hello.greeting.query({name: 'test name'});
  console.log(greeting);
  await prisma.content.create({
    data: {
      googleMapLink: '',
      hashTag: '',
      kakaoMapLink: '',
      latitude: 1,
      longitude: 1.1,
      name: 'm',
      naverMapLink: '',
      recommandHashTags: [],
      tMapLink: '',
      type: 'realtimeHotPlace',
    },
  });
  const users = await client.user.list.query();
  console.log(users);
};

// eslint-disable-next-line no-void
void test();
