import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format:
            process.env.NODE_ENV === 'production'
              ? winston.format.simple()
              : winston.format.combine(
                  winston.format.colorize(),
                  winston.format.timestamp(),
                  utilities.format.nestLike(),
                ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(winston.format.timestamp()),
        }),
        new winston.transports.File({
          filename: 'logs/log.log',
          format: winston.format.combine(winston.format.timestamp()),
        }),
      ],
    }),
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
  logger.log('Application listening on port 3000');
}
bootstrap();
