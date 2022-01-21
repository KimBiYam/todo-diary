import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { configModuleOption } from '../config';
import typeOrmConfig from '../config/typeorm.config';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { DiaryModule } from './diary';
import { OrmExceptionFilter } from '@src/filters/orm-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(configModuleOption),
    UserModule,
    AuthModule,
    DiaryModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: OrmExceptionFilter }],
})
export class AppModule {}
