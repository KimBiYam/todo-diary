import { User } from '../../types/auth.types';
import userReducer, { login, logout } from '../user';

describe('user reducer', () => {
  it('should has a initial state', () => {
    //given
    const initialState = { user: undefined };

    //when
    const state = userReducer(undefined, { type: '@@INIT' });

    //then
    expect(state).toEqual(initialState);
  });

  it('should success set user when used login action', () => {
    //given
    const initialState = { user: undefined };

    const user: User = {
      createdAt: new Date(),
      displayName: 'test',
      email: 'test@test.com',
    };

    //when
    const state = userReducer(initialState, login(user));

    //then

    expect(state.user).toEqual(user);
  });

  it('should success clear user when used logout action', () => {
    //given
    const initialState = {
      user: {
        createdAt: new Date(),
        displayName: 'test',
        email: 'test@test.com',
      },
    };

    //when
    const state = userReducer(initialState, logout());

    //then
    expect(state.user).toEqual(undefined);
  });
});
