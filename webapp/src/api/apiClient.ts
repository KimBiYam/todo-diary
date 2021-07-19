import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../constants';
import tokenStorage from '../storage/tokenStorage';
import { store } from '../index';
import { openDialog } from '../reducers/dialog';
import { StatusCodes } from 'http-status-codes';

const apiClient = axios.create({ baseURL: SERVER_URL });

apiClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getToken();

  config.headers.Authorization =
    `${process.env.REACT_APP_TOKEN_PREFIX} ${accessToken}` || '';

  return config;
});

apiClient.interceptors.response.use(
  (config) => config,
  (error: AxiosError) => {
    const { dispatch, getState } = store;
    const {
      dialog: { isOpen },
    } = getState();

    if (!isOpen) {
      const text = convertErrorText(error.response?.status);
      const openTime = 2 * 1000;
      dispatch(openDialog({ text, openTime }));
    }

    return error;
  },
);

const convertErrorText = (status: number | undefined) => {
  switch (status) {
    case StatusCodes.BAD_REQUEST:
      return '요청이 잘못 되었습니다';
    case StatusCodes.UNAUTHORIZED:
      return '인증 정보가 잘못 되었습니다';
    case StatusCodes.NOT_FOUND:
      return '데이터를 찾을 수 없습니다';
    default:
      return '서버 에러입니다';
  }
};

export default apiClient;
