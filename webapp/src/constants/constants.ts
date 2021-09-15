const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';

export const BACKEND_SERVER_URL = IS_DEVELOPMENT_MODE
  ? 'http://localhost:5000'
  : 'https://todo-diary-backend.herokuapp.com';

export const CLIENT_SERVER_URL = IS_DEVELOPMENT_MODE
  ? 'http://localhost:3000'
  : 'https://www.todo-diary.p-e.kr';

export const GITHUB_REDIRECT_URL = `${CLIENT_SERVER_URL}/sign-in/github`;
export const GITHUB_OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}`;
