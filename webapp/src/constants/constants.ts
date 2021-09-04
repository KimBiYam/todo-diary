const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';

export const BACKEND_SERVER_URL = IS_DEVELOPMENT_MODE
  ? 'http://localhost:5000'
  : '';

export const CLIENT_SERVER_URL = IS_DEVELOPMENT_MODE
  ? 'http://localhost:3000'
  : 'https://todo-diary.vercel.app';
