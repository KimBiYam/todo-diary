import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { APP_FILTER } from '@nestjs/core';
import { configModuleOption, typeormConfig } from 'src/config/';
import { ConfigModule } from '@nestjs/config';
import { CustomExceptionFilter } from 'src/filters/custom-exception.filter';
import { AuthModule } from '../auth';

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
