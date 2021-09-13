import { useMutation, UseMutationOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';

const useDeleteDiaryMutation = (
  options?: UseMutationOptions<unknown, string, string>,
) => useMutation((id: string) => diaryApi.deleteDiary(id), options);

export default useDeleteDiaryMutation;
