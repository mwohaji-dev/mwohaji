/* eslint-disable no-param-reassign */
import {PrismaClient} from '@prisma/client';
import {DATABASE_URL} from './env';

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});
const prisma = prismaClient.$extends({
  query: {
    user: {
      async findMany({args, query}) {
        // soft delete
        args.where = {deletedAt: null, ...args.where};
        return query(args);
      },
    },
  },
});

export default prisma;
