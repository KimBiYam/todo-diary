import { deserializeUser, User } from '../auth.types';

describe('auth types', () => {
  describe('deserializeUser', () => {
    it('should success deserialize user without unused fields', () => {
      //given
      const responseUser: User = {
        displayName: 'test',
        email: 'test@test.com',
        createdAt: new Date(),
        unusedField: 'unusedField',
      } as User;

      //when
      const result = deserializeUser(responseUser);

      const expectedUser: User = {
        displayName: 'test',
        email: 'test@test.com',
        createdAt: new Date(),
      };

      //then
      expect(result).toEqual(expectedUser);
    });
  });
});
