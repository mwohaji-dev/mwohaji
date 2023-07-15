# 리포지토리의 최상단 docker-compose.yaml을 path의 기준으로 작성되었습니다.
FROM node:18

WORKDIR /mwohaji/server

COPY server/package.json server/prisma/schema.prisma ./
# 패키지 설치
RUN yarn install --immutable
# 나머지 파일 복사
COPY server ./

CMD yarn start
