/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as moment from 'moment-timezone';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor());
  Date.prototype.toJSON = function() {
    return moment(this).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
  }

  await app.listen(8080);
}
bootstrap();
