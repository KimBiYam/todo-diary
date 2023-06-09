import { DataSourceOptions } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'PRODUCTION';

const config: DataSourceOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: Number(process.env.MARIADB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DEFAULT_DATABASE,
  synchronize: !isProduction,
  migrationsRun: isProduction,
  charset: process.env.DB_CHARSET,
  logging: !isProduction,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export = config;
