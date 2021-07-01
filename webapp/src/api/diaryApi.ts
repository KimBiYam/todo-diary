import { Diary } from '../types/diary.types';
import apiClient from './apiClient';

const diaryApi = {
  async getDiaries() {
    try {
      const response = await apiClient.get<Diary[]>('/api/diaries');
      const data = response.data;
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};

export default diaryApi;
