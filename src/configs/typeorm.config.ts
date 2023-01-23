import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME || 'localhost',
  port: parseInt(process.env.REDS_PORT) || 5432,
  username: process.env.RDS_USERNAME || 'heechan',
  password: process.env.RDS_PASSWORD || 'root',
  database: process.env.RDS_DB_NAME || 'boilerplate',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
