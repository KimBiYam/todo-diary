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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(configModuleOption),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    AuthModule,
    DiaryModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: OrmExceptionFilter }],
})
export class AppModule {}
