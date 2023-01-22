import { DataSourceOptions } from 'typeorm';
import * as process from 'process';
import { NODE_ENV_TYPE } from '../type';

export const ormconfig: Record<NODE_ENV_TYPE, DataSourceOptions> = {
  production: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: Number(process.env.MYSQL_PORT),
    database: 'WeShareUs',
    synchronize: true,
    logging: true,
  },
  development: {
    type: 'mysql',
    host: process.env.DEV_MYSQL_HOST,
    username: process.env.DEV_MYSQL_USERNAME,
    password: process.env.DEV_MYSQL_PASSWORD,
    port: Number(process.env.DEV_MYSQL_PORT),
    database: 'WeShareUs',
    synchronize: true,
    logging: false,
  },
  // NOTE: 테스트를 돌리기위해 넣은 값. 의미없는 값들이다.
  test: {
    type: 'mysql',
    host: 'localhost',
    username: 'test',
    password: 'test',
    port: 3306,
    database: 'test',
    synchronize: false,
    logging: false,
  },
};
