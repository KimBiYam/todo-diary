import apiClient from './apiClient';

const diaryApi = {
  async getDiaries() {
    try {
      const response = await apiClient.get('/api/diaries');
      const data = response.data;

      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};

export default diaryApi;
