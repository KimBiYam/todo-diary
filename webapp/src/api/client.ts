import axios from 'axios';
import { SERVER_URL } from '../constants';
import tokenStorage from '../storage/tokenStorage';

const client = axios.create({ baseURL: SERVER_URL });

client.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getToken();

  config.headers.Authorization =
    `${process.env.REACT_APP_TOKEN_PREFIX} ${accessToken}` || '';

  return config;
});

export default client;