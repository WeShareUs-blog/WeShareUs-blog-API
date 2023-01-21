import { DataSource } from 'typeorm';
import { ormconfig } from './ormconfig';
import { NODE_ENV_TYPE } from '../type';

const env = process.env.NODE_ENV as NODE_ENV_TYPE;
export const datasource = new DataSource(ormconfig[env]);

export function connectMysql() {
  datasource
    .initialize()
    .then(() => {
      console.log('connect mysql..!');
    })
    .catch((err) => {
      console.error(err);
    });
}
