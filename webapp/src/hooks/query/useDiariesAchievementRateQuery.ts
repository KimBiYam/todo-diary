import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { User } from '../../types/auth.types';

const useDiariesAchievementRateQuery = (
  user: User | undefined,
  options?: UseQueryOptions<string, AxiosError>,
) => useQuery(createKey(user), diaryApi.getDiariesAchievementRate, options);

const createKey = (user: User | undefined) => ['diariesAchievementRate', user];

export default useDiariesAchievementRateQuery;
