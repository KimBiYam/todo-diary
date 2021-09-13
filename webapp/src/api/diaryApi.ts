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
  try {
    const response = await apiClient.get<DiaryResponse>(`${API_DIARIES}/${id}`);

    const { diary } = response.data;
    return diary;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getDiaries = async (page: number, limit: number) => {
  try {
    const response = await apiClient.get<DiariesResponse>(API_DIARIES, {
      params: { page, limit },
    });

    const { diaries } = response.data;
    return diaries;
  } catch (e) {
    console.error(e);
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
    console.error(e);
    throw e;
  }
};

const updateDiary = async ({ id, ...body }: UpdateDiaryParams) => {
  try {
    const response = await apiClient.patch(`${API_DIARIES}/${id}`, body);

    const { diary } = response.data;

    return diary;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deleteDiary = async (id: string) => {
  try {
    const response = await apiClient.delete(`${API_DIARIES}/${id}`);

    const { diary } = response.data;

    return diary;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getDiariesStatisticsByYear = async (year: number) => {
  try {
    const response = await apiClient.get<DiariesStatisticsResponse>(
      `${API_DIARIES_STATISTICS}`,
      {
        params: { year },
      },
    );

    const { diariesStatisticsByYear } = response.data;

    return diariesStatisticsByYear;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const diaryApi = {
  getDiaryById,
  getDiaries,
  writeDiary,
  updateDiary,
  deleteDiary,
  getDiariesStatisticsByYear,
};

export default diaryApi;
