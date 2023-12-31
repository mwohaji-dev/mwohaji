# 뭐하지?

# 권장 버전
- node >= 18
- yarn >= 1.22
- docker >= 20
- docker compose >= 2 (docker-compose X)

# Unit Testing
## App
```sh
cd app
yarn install
yarn test
```
## Server
```sh
cd server
yarn install
# docker compose를 사용해서 testing용 mysql과 firebase-emulator를 띄웁니다.
# 권장 버전의 docker compose가 깔려있어야 합니다.
yarn test:setup
yarn test
```

# devenv setup
```sh
docker compse build
docker compse up
```

# Troubleshooting
- app의 network 연결이 안된다면 `app/src/constants/server.ts`를 수정
- 실제 디바이스에서 연결이 안된다면 `yarn localip`를 통해 ip 주소를 알아내고 `app/src/constants/server.ts`에 반영
- sign-in이 안된다면 앱에서 `sign-out` 후 `localhost:4001`에 접속한후 모든 유저를 한번 날려준다.
