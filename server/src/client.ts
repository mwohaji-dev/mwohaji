/* eslint-disable no-console */
import {createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import type {AppRouter} from './router';
import prisma from './configs/prisma';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

const test = async () => {
  const greeting = await client.hello.greeting.query({name: 'test name'});
  console.log(greeting);
  await prisma.user.createMany({
    data: [
      {name: 'name1', email: 'email1'},
      {name: 'name2', email: 'email2'},
      {name: 'name3', email: 'email3'},
    ],
    skipDuplicates: true,
  });
  const users = await client.user.list.query();
  console.log(users);
};

// eslint-disable-next-line no-void
void test();
