import {exec as _exec} from 'child_process';
import {promisify} from 'util';
import {DATABASE_URL} from './configs/env';

const exec = promisify(_exec);

beforeAll(async () => {
  // 매 테스트마다 데이터베이스를 초기화합니다.
  const command = `DATABASE_URL=${DATABASE_URL} yarn prisma:initdb`;
  await exec(command);
});
