import { DataSource } from 'typeorm';
import { ormconfig } from './ormconfig';
import { NODE_ENV_TYPE } from '../type';
import entities from './entities';

const env = process.env.NODE_ENV as NODE_ENV_TYPE;
export const datasource = new DataSource({ ...ormconfig[env], entities });

export async function connectMysql() {
  await datasource.initialize();
}
