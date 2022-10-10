import { Module } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/rmqproxy/client-proxy';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';


@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ClientProxySmartRanking]
})
export class CategoriesModule {}
