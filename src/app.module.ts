import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';
import { RmqproxyModule } from './rmqproxy/rmqproxy.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [CategoriesModule, PlayersModule, RmqproxyModule, AuthModule, AwsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
