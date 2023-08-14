import {initTRPC} from '@trpc/server';
import {Context} from '../middlewares/createContext';

const t = initTRPC.context<Context>().create();

export const {router, middleware, procedure} = t;
export {t};
