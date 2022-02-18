import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import path from 'path';

export const getMariaDBTestTypeOrmModule = () =>
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      ({
        type: 'mariadb',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DEFAULT_DATABASE'),
        entities: [path.join(__dirname, '../../entities/**/*.entity.ts')],
        synchronize: true,
      } as TypeOrmModuleAsyncOptions),
  });
