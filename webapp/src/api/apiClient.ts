import axios, { AxiosError } from 'axios';
import { BACKEND_SERVER_URL } from '../constants';
import tokenStorage from '../storage/tokenStorage';
import { StatusCodes } from 'http-status-codes';

const apiClient = axios.create({ baseURL: BACKEND_SERVER_URL });

apiClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getToken();

  config.headers.Authorization =
    `${process.env.REACT_APP_TOKEN_PREFIX} ${accessToken}` || '';

  return config;
});

apiClient.interceptors.response.use(
  (config) => config,
  (error: AxiosError) => {
    const errorText = convertErrorText(error.response?.status);

    throw errorText;
  },
);

const convertErrorText = (status: number | undefined) => {
  switch (status) {
    case StatusCodes.BAD_REQUEST:
      return '잘못된 요청입니다.';
    case StatusCodes.UNAUTHORIZED:
      return '인증 정보가 잘못 되었습니다';
    case StatusCodes.FORBIDDEN:
      return '권한이 없습니다';
    case StatusCodes.NOT_FOUND:
      return '데이터를 찾을 수 없습니다';
    default:
      return '서버 에러입니다';
  }
};

export default apiClient;
