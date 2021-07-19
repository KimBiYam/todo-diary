import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { Diary } from '../../types/diary.types';

const useWriteDiaryMutation = (
  title: string,
  content: string,
  options: UseMutationOptions<Diary, AxiosError> = {},
) =>
  useMutation('writeDiary', () => diaryApi.writeDiary(title, content), {
    ...options,
  });

export default useWriteDiaryMutation;
