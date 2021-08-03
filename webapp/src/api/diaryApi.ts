import {
  DiariesAchievementRateResponse,
  DiariesResponse,
  DiaryResponse,
} from '../types/diary.types';
import apiClient from './apiClient';

const API_DIARIES = '/api/v1/diaries';
const API_DIARIES_ACHIEVEMENT_RATE = '/api/v1/diaries/achievement-rate';

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

const getDiariesAchievementRate = async () => {
  try {
    const response = await apiClient.get<DiariesAchievementRateResponse>(
      API_DIARIES_ACHIEVEMENT_RATE,
    );

    const { achievementRate } = response.data;
    return achievementRate;
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
  getDiariesAchievementRate,
  writeDiary,
};

export default diaryApi;
