import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.${process.env.NODE_ENV}.env`,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'prod', 'local'),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
    FIREBASE_TYPE: Joi.string().required(),
    FIREBASE_PROJECT_ID: Joi.string().required(),
    FIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
    FIREBASE_PRIVATE_KEY: Joi.string().required(),
    FIREBASE_CLIENT_EMAIL: Joi.string().required(),
    FIREBASE_CLIENT_ID: Joi.string().required(),
    FIREBASE_UTH_URI: Joi.string().required(),
    FIREBASE_TOKEN_URI: Joi.string().required(),
    FIREBASE_AUTH_CERT_URL: Joi.string().required(),
    FIREBASE_CLIENT_CERT_URL: Joi.string().required(),
    FIREBASE_UNIVERSAL_DOMAIN: Joi.string().required(),
    TOKEN_CACHE_TTL: Joi.number().required(),
    SEOUL_NODE: Joi.string().required(),
    SEOUL_ROUTE: Joi.string().required(),
  }),
});
