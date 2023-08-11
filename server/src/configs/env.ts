import {config} from 'dotenv';

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const {NODE_ENV} = process.env;
if (!NODE_ENV) throw new Error('NODE_ENV가 선안되지 않았습니다.');
if (NODE_ENV !== 'production') {
  config({path: `.env.${NODE_ENV}`});
}

export const {PORT, DATABASE_URL} = process.env as {
  [key: string]: string;
};
export {NODE_ENV};
