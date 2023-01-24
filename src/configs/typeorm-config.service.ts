import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(this.configService.get('DB_TYPE'), 'DB_TYPE');
    return {
      type: this.configService.get('DB_TYPE') || 'postgres',
      host: this.configService.get('DB_HOSTNAME'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    } as TypeOrmModuleOptions;
  }
}
