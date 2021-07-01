import axios from 'axios';
import { SERVER_URL } from '../constants';
import tokenStorage from '../storage/tokenStorage';

const apiClient = axios.create({ baseURL: SERVER_URL });

apiClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getToken();

  config.headers.Authorization =
    `${process.env.REACT_APP_TOKEN_PREFIX} ${accessToken}` || '';

  return config;
});

export default apiClient;
