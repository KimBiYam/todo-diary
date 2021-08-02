import { DiariesResponse, DiaryResponse } from '../types/diary.types';
import apiClient from './apiClient';

const API_DIARIES = '/api/v1/diaries';

const getDiaries = async (page: number, limit: number) => {
  try {
    const response = await apiClient.get<DiariesResponse>(API_DIARIES, {
      params: { page, limit },
    });

    const { diaries } = response.data;
    return diaries;
  } catch (e) {
    throw e;
  }
};

const writeDiary = async (title: string, content: string) => {
  try {
    const response = await apiClient.post<DiaryResponse>(API_DIARIES, {
      title,
      content,
    });

    const { diary } = response.data;

    return diary;
  } catch (e) {
    throw e;
  }
};

const diaryApi = {
  getDiaries,
  writeDiary,
};

export default diaryApi;
