import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from './aws.service';
import { AWSCognitoConfig } from './cognito.config';
import { CognitoService } from './cognito.service';
import { S3Service } from './s3.service';

@Module({
  imports: [ ConfigModule ],
  providers: [ AwsService, CognitoService, AWSCognitoConfig, S3Service ],
  exports: [ AwsService, CognitoService, AWSCognitoConfig ]
})
export class AwsModule {}
