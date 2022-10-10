import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {

    constructor(private config: ConfigService) {}

    private logger: Logger = new Logger(S3Service.name);

    
    public async uploadFile(file: any, email: string) {
        
        const s3 = new AWS.S3({
            region: this.config.get<string>('AWS_REGION'),
            accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY')
        });

        const fileExt = file.originalname.split(".")[1];

        const urlKey = `${ email }.${ fileExt }`;

        this.logger.log(urlKey);

        const params = {
            Body: file.buffer,
            Bucket: this.config.get<string>('AWS_S3_BUCKET_NAME'),
            Key: urlKey
        }

        const data = s3.putObject(params).promise().then( data => {
                                                            return {
                                                                url: `https://smartranking-matheus.s3-sa-east-1.amazonaws.com/${urlKey}`
                                                            };
                                                          },
                                                          err => {
                                                            this.logger.error(err);
                                                            return err;
                                                          }
        );

        return data;
    }
}
