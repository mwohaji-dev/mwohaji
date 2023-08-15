import {exec as _exec} from 'child_process';
import {promisify} from 'util';
import {DATABASE_URL} from './configs/env';
import {auth} from './configs/firebase';

const exec = promisify(_exec);

jest.useFakeTimers({doNotFake: ['nextTick']});
jest.setSystemTime(new Date('2023-05-11'));

beforeEach(async () => {
  // 매 테스트마다 데이터베이스를 초기화합니다.
  const command = `DATABASE_URL=${DATABASE_URL} yarn prisma:initdb`;
  await exec(command);
  // 매 테스트마다 firebase를 초기화합니다.
  const users = await auth.listUsers();
  await auth.deleteUsers(users.users.map(({uid}) => uid));
});
