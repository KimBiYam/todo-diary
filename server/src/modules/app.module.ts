import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { configModuleOption, typeormConfig } from '../config';
import { CustomExceptionFilter } from '../filters/custom-exception.filter';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { DiaryModule } from './diary';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ConfigModule.forRoot(configModuleOption),
    UserModule,
    AuthModule,
    DiaryModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: CustomExceptionFilter }],
})
export class AppModule {}
