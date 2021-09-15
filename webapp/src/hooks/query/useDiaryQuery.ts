import { useQuery, UseQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { Diary } from '../../types/diary.types';

const useDiaryQuery = (id: string, options?: UseQueryOptions<Diary, string>) =>
  useQuery(createKey(id), () => diaryApi.getDiaryById(id), options);

const createKey = (id: string) => ['diary', id];

useDiaryQuery.createKey = createKey;

export default useDiaryQuery;
