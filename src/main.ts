/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as moment from 'moment-timezone';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = function(): any {
    return moment(this).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
  }

  await app.listen(8080);
}
bootstrap();
