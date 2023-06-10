# Todo Diary

> 해야 할 일을 작성하고, 월별 통계 그래프를 볼 수 있습니다

## Features

- [x] 구글 소셜 로그인
- [x] 깃허브 소셜 로그인
- [x] 할 일 추가
- [x] 할 일 수정
- [x] 할 일 삭제
- [x] 지정한 날짜의 할일 조회
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
- GraphQL

### Client

- React
- TypeScript
- Vite
- Redux
- Redux Toolkit
- React Query
- Emotion
- GraphQL
- Apollo Client

## Getting started

## Server 

### Environments
환경변수 설정을 위해 env 파일이 필요
.env.sample 과 .env.dev.sample 파일을 참고하여 설정

- Devlopment Mode : .env.dev
- Production Mode : .env

### Run Devlopment Mode

### Run

```
> ./run-dev.sh up
```

### Stop

```
> ./run-dev.sh down
```

---

### Run Production Mode

### Run

```
> ./run.sh up
```

### Stop

```
> ./run.sh down
```

---

### Run Test
```
> npm run test
```

## Client

### Environments
환경변수 설정을 위해 env 파일이 필요
.env.sample 과 .env.development.sample 파일을 참고하여 설정

- Development Mode : .env.development
- Production Mode : .env

### Run Development Mode

```bash
> yarn start
```
