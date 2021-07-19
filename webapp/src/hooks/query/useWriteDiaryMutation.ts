import { useMutation, UseMutationOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';

const useWriteDiaryMutation = (
  title: string,
  content: string,
  options: UseMutationOptions = {},
) =>
  useMutation('writeDiary', () => diaryApi.writeDiary(title, content), {
    ...options,
  });

export default useWriteDiaryMutation;
