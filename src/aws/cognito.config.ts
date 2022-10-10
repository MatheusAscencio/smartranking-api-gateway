import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AWSCognitoConfig {

    constructor(private config: ConfigService) {}

    public userPoolId: string = this.config.get<string>('us-east-1_pDujDMvga');
    public clientId: string = this.config.get<string>('COGNITO_CLIENT_ID');
    public region: string = this.config.get<string>('AWS_REGION_US_VIRGINIA');
    public authority: string = `https;//cognito-idp.${ this.region }.amazonaws.com/${ this.userPoolId }`;
}