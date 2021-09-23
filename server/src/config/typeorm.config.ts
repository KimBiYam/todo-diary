import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SocialAccount, User, Diary, DiaryMeta } from '@src/entities';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: Number(process.env.MARIADB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DEFAULT_DATABASE,
  synchronize: process.env.NODE_ENV === 'DEVELOPMENT',
  charset: process.env.DB_CHARSET,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV === 'DEVELOPMENT',
  entities: [User, SocialAccount, Diary, DiaryMeta],
};
