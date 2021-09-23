import {
  DiariesResponse,
  DiariesStatisticsResponse,
  DiaryResponse,
  UpdateDiaryParams,
} from '../types/diary.types';
import apiClient from './apiClient';

const API_DIARIES = '/api/v1/diaries';
const API_DIARIES_STATISTICS = '/api/v1/diaries/statistics';

const getDiaryById = async (id: string) => {
  const response = await apiClient.get<DiaryResponse>(`${API_DIARIES}/${id}`);

  const { diary } = response.data;
  return diary;
};

const getDiaries = async (page: number, limit: number) => {
  const response = await apiClient.get<DiariesResponse>(API_DIARIES, {
    params: { page, limit },
  });

  const { diaries } = response.data;
  return diaries;
};

const writeDiary = async (title: string, content: string) => {
  const response = await apiClient.post<DiaryResponse>(API_DIARIES, {
    title,
    content,
  });

  const { diary } = response.data;

  return diary;
};

const updateDiary = async ({ id, ...body }: UpdateDiaryParams) => {
  const response = await apiClient.patch(`${API_DIARIES}/${id}`, body);

  const { diary } = response.data;

  return diary;
};

const deleteDiary = async (id: string) => {
  const response = await apiClient.delete(`${API_DIARIES}/${id}`);

  const { diary } = response.data;

  return diary;
};

const getDiariesStatisticsByYear = async (year: number) => {
  const response = await apiClient.get<DiariesStatisticsResponse>(
    `${API_DIARIES_STATISTICS}`,
    {
      params: { year },
    },
  );

  const { diariesStatisticsByYear } = response.data;

  return diariesStatisticsByYear;
};

const getDatesTheDiaryExists = async (year: number, month: number) => {};

const diaryApi = {
  getDiaryById,
  getDiaries,
  writeDiary,
  updateDiary,
  deleteDiary,
  getDiariesStatisticsByYear,
};

export default diaryApi;
