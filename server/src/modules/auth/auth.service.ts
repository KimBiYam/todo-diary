import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
  async googleLogin(user: Request) {
    return {
      message: 'User information from google',
      user: user,
    };
  }
}
