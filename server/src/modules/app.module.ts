import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { configModuleOption, typeormConfig } from '../config';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { DiaryModule } from './diary';
import { HttpExceptionFilter } from '@src/filters/http-exception.filter';
import { OrmExceptionFilter } from '@src/filters/orm-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ConfigModule.forRoot(configModuleOption),
    UserModule,
    AuthModule,
    DiaryModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: OrmExceptionFilter },
  ],
})
export class AppModule {}
