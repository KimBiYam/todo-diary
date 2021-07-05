import { GetDiariesResponseData } from '../types/diary.types';
import apiClient from './apiClient';

const diaryApi = {
  async getDiaries() {
    try {
      const response = await apiClient.get<GetDiariesResponseData>(
        '/api/diaries',
      );
      const { diaries } = response.data;
      return diaries;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};

export default diaryApi;
