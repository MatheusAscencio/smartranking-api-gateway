import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AWSCognitoConfig } from './cognito.config';
import { CognitoService } from './cognito.service';

@Module({
  providers: [AwsService, CognitoService, AWSCognitoConfig],
  exports: [AwsService, CognitoService, AWSCognitoConfig]
})
export class AwsModule {}
