import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';
import { RmqProxyModule } from './rmqproxy/rmqproxy.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';
import { ChallengesModule } from './challenges/challenges.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [CategoriesModule, PlayersModule, RmqProxyModule, AuthModule, AwsModule, ConfigModule.forRoot({ isGlobal: true }), ChallengesModule, MatchesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
