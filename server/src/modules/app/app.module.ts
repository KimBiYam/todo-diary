import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth';
import { configModuleOption, typeormConfig } from '../../config';
import { CustomExceptionFilter } from '../../filters/custom-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ConfigModule.forRoot(configModuleOption),
    UserModule,
    AuthModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: CustomExceptionFilter }],
})
export class AppModule {}
