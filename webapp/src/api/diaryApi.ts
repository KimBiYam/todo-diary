import { GetDiariesResponseData } from '../types/diary.types';
import apiClient from './apiClient';

const API_DIARIES = '/api/diaries';

const getDiaries = async () => {
  try {
    const response = await apiClient.get<GetDiariesResponseData>(API_DIARIES);

    const { diaries } = response.data;
    return diaries;
  } catch (e) {
    throw e;
  }
};

const writeDiary = async (title: string, content: string) => {
  try {
    const response = await apiClient.post(API_DIARIES, { title, content });

    return response;
  } catch (e) {
    throw e;
  }
};

const diaryApi = {
  getDiaries,
  writeDiary,
};

export default diaryApi;
