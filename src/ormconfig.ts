import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(${environment}.env));
// You can also make a singleton service that load and expose the .env file content.
// ...

require('dotenv').config();

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "stock",
  entities: [
      "./src/models/*.ts"
  ],
  migrations: [
      "./src/database/migrations/*.ts"
  ],
  //host: 'localhost',
  //port: 5432,
  //username: 'postgres',
  //password: 'docker',
  //database: 'loopbox',

  // We are using migrations, synchronize should be set to false.
  // synchronize: process.env.TYPEORM_SYNC === 'true',

  // // Run migrations automatically,
  // // you can disable this if you prefer running migration manually.
  // migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  // logging: process.env.TYPEORM_LOGGING === 'true',
  // logger: 'file',

  // // allow both start:prod and start:dev to use migrations
  // // dirname is either dist or src folder, meaning either
  // // the compiled js in prod or the ts in dev
  
  // cli: {
  //   migrationsDir: './src/database/migrations',
  // },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;