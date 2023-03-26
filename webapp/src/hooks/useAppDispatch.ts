import { AppDispatch } from '@src/reducers/rootReducer';
import { useDispatch } from 'react-redux';

export default function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
