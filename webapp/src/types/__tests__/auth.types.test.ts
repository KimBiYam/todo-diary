import { deserializeUser, User } from '../auth.types';

describe('auth types', () => {
  describe('deserializeUser', () => {
    it('should success deserialize user without unuse fields', () => {
      //given
      const responseUser: User = {
        displayName: 'test',
        email: 'test@test.com',
        createdAt: new Date(),
        photoUrl: 'test',
        unuseField: 'unuseField',
      } as User;

      //when
      const result = deserializeUser(responseUser);

      const expectedUser: User = {
        displayName: 'test',
        email: 'test@test.com',
        createdAt: new Date(),
        photoUrl: 'test',
      };

      //then
      expect(result).toEqual(expectedUser);
    });
  });
});
