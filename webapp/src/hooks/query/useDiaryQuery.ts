import { useQuery, UseQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import HttpError from '../../api/models/httpError';
import { Diary } from '../../types/diary.types';

const useDiaryQuery = (
  id: string,
  options?: UseQueryOptions<Diary, HttpError>,
) => useQuery(createKey(id), () => diaryApi.getDiaryById(id), options);

const createKey = (id: string) => ['diary', id];

useDiaryQuery.createKey = createKey;

export default useDiaryQuery;
