import { SocialAccount, User, Diary, DiaryMeta } from '@src/entities';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'PRODUCTION';

const config: ConnectionOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: Number(process.env.MARIADB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DEFAULT_DATABASE,
  synchronize: false,
  migrationsRun: true,
  charset: process.env.DB_CHARSET,
  logging: !isProduction,
  entities: [User, SocialAccount, Diary, DiaryMeta],
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: join(__dirname, '../entities'),
    migrationsDir: join(__dirname, '../migrations'),
  },
};

export = config;
