import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import 'dotenv/config';

config();

export const datasource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity.{ts,js}'],
});

export const testDatasource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.TEST_DB,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity.{ts,js}'],
});
