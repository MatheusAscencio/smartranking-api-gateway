import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsModule } from '../aws/aws.module';

@Module({
  controllers: [AuthController],
  imports: [AwsModule]
})
export class AuthModule {}
