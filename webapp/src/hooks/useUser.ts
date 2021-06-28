import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/store';
import { login, logout } from '../reducers/userReducer';
import { User } from '../types/user.types';

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const userLogin = (user: User) => {
    dispatch(login(user));
  };

  const userLogout = () => {
    dispatch(logout());
  };

  return { user, userLogin, userLogout };
};

export default useUser;
