import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialAccount, User } from '@src/entities';
import { UserModule } from '@src/modules/user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    ConfigService,
    UserModule,
    TypeOrmModule.forFeature([SocialAccount, User]),
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      // TODO : Change expires date
      signOptions: { expiresIn: '15day' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
