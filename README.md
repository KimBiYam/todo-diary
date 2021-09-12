# [Todo Diary](https://todo-diary.vercel.app)

> 해야 할 일을 작성하고, 월별 통계 그래프를 볼 수 있습니다

## Features

- [x] 구글 소셜 로그인
- [x] 깃허브 소셜 로그인
- [x] 할 일 추가
- [ ] 할 일 수정
- [ ] 할 일 삭제
- [ ] 지정한 날짜의 할일 조회
- [x] 월별 통계 그래프


## Project Stack

### Server

[nest-js-mariadb-boilerplate](https://github.com/KimBiYam/nest-js-mariadb-boilerplate)을 기반으로 구성

- NestJs
- TypeScript
- TypeORM
- MariaDB
- Docker
- Docker Compose

### Client

- React
- TypeScript
- Redux
- Redux Toolkit
- React Query
- Emotion
- react-responsive

### Deployment
- Server
  - AWS RDS
  - Heroku
- Client
  - Vercel
