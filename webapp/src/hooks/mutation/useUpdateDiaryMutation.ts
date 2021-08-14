import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { UpdateDiaryParams } from '../../types/diary.types';

const useUpdateDiaryMutation = (
  options?: UseMutationOptions<unknown, AxiosError, UpdateDiaryParams>,
) =>
  useMutation(
    (params: UpdateDiaryParams) => diaryApi.updateDiary(params),
    options,
  );

export default useUpdateDiaryMutation;
