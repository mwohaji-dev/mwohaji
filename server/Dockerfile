# 리포지토리의 최상단 docker-compose.yaml을 path의 기준으로 작성되었습니다.
FROM node:18
# pnpm 설치
RUN npm i -g pnpm@7
# root 디렉토리 쪽 패키지 관련 파일들 족사
WORKDIR /mwohaji
COPY pnpm*.yaml ./
# server 디렉토리 쪽 패키지 관련 파일 복사
WORKDIR /mwohaji/server
COPY server/package.json ./
# 패키지 설치
RUN pnpm install --frozen-lockfile
# 나머지 파일 복사
COPY server ./
# prisma client 초기화
RUN pnpm prisma:generate
# RUN pnpm build
