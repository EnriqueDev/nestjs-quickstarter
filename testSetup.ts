import { DataSource } from 'typeorm';
import { datasource, testDatasource } from '~database/mysql.datasource';

let testDB: DataSource;

beforeAll(async () => {
  const connection = await datasource.initialize();

  await connection.query(`DROP DATABASE IF EXISTS ${process.env.TEST_DB}`);
  await connection.query(`CREATE DATABASE ${process.env.TEST_DB}`);

  await connection.destroy();

  testDB = await testDatasource.initialize();
  await testDB.runMigrations();
  await testDB.destroy();
});
