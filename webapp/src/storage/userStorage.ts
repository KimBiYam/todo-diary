import { User } from '../types/auth.types';

const USER = 'USER';

const getUser = () => {
  const user = localStorage.getItem(USER);

  if (!user) {
    return null;
  }

  return user;
};

const setUser = (user: User) => {
  localStorage.setItem(USER, JSON.stringify(user));
};

const clearUser = () => {
  localStorage.removeItem(USER);
};

const isUserExists = () => {
  return !!getUser();
};

const userStorage = { getUser, setUser, clearUser, isUserExists };

export default userStorage;
