import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async googleLogin(user) {
    return {
      message: 'User information from google',
      user: user,
    };
  }
}
