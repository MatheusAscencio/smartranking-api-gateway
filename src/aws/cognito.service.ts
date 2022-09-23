import { Injectable } from '@nestjs/common';
import { RecordDTO } from 'src/auth/DTOs/record.dto';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { AWSCognitoConfig } from './cognito.config';
import { LoginDTO } from '../auth/DTOs/login.dto';

@Injectable()
export class CognitoService {

    private userPool: CognitoUserPool;

    constructor(private awsConfig: AWSCognitoConfig) {
        this.userPool = new CognitoUserPool({
            UserPoolId: this.awsConfig.userPoolId,
            ClientId: this.awsConfig.clientId
        });

    }

    async register(record: RecordDTO) {

        const { name, email, password, phoneNumber } = record;

        return new Promise((resolve, reject) => {
            this.userPool.signUp(email, password, [ new CognitoUserAttribute( { Name: 'phone_number', Value: phoneNumber } ),
                                                    new CognitoUserAttribute( { Name: 'name', Value: name } )],
                                                    null,
                                                    (err, result) => {
                                                        if(!result) {
                                                            reject(err);
                                                        }  else {
                                                            resolve(result.user);
                                                        }
                                                    });
        })
    }


    async authenticate(login: LoginDTO) {
        
        const { email, password } = login;

        const userData = {
            Username: email,
            Pool: this.userPool
        }

        const userCognito = new CognitoUser(userData);

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        return new Promise((resolve, reject) => {
            userCognito.authenticateUser(authDetails, {
                onSuccess: result => resolve(result),
                onFailure: err => reject(err) 
            });
        })
    }
}
