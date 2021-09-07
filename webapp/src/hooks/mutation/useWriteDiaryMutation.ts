import { useMutation, UseMutationOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { Diary } from '../../types/diary.types';

const useWriteDiaryMutation = (
  options: UseMutationOptions<
    Diary,
    string,
    { title: string; content: string }
  > = {},
) =>
  useMutation(
    'writeDiary',
    ({ title, content }: { title: string; content: string }) =>
      diaryApi.writeDiary(title, content),
    {
      ...options,
    },
  );

export default useWriteDiaryMutation;
