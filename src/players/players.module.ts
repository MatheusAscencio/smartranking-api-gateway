import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { RmqProxyModule } from '../rmqproxy/rmqproxy.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [ RmqProxyModule, AwsModule ],
  controllers: [ PlayersController ],
  providers: [ PlayersService ]
})
export class PlayersModule {}
