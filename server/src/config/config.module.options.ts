import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const configModuleOption: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'DEVELOPMENT' ? '.env.dev' : '.env',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('DEVELOPMENT', 'PRODUCTION', 'TEST')
      .default('DEVELOPMENT'),
    SERVER_PORT: Joi.number().default(5000),
    SWAGGER_TITLE: Joi.string().default('SWAGGER_TITLE'),
    SWAGGER_DESCRIPTION: Joi.string().default('SWAGGER_DESCRIPTION'),
    SWAGGER_API_VERSION: Joi.string().default('SWAGGER_API_VERSION'),
    DB_TYPE: Joi.string(),
    DB_HOST: Joi.string(),
    DB_USERNAME: Joi.string(),
    DB_PASSWORD: Joi.string(),
    DB_PORT: Joi.string(),
    DB_DEFAULT_DATABASE: Joi.string(),
    DB_CHARSET: Joi.string(),
    JWT_SECRET_KEY: Joi.string(),
    TZ: Joi.string(),
    GITHUB_SECRET: Joi.string(),
    GITHUB_CLIENT_ID: Joi.string(),
  }),
};
