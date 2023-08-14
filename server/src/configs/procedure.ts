import authorization from '../middlewares/authentication';
import {procedure} from './trpc';

export const publicProcedure = procedure;
export const authorizedProcedure = procedure.use(authorization);
