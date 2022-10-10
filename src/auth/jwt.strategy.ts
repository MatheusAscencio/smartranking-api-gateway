import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AWSCognitoConfig } from 'src/aws/cognito.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    private logger: Logger = new Logger(JwtStrategy.name);

    constructor( private authConfig: AWSCognitoConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            audience: authConfig.clientId,
            issuer: authConfig.authority,
            algorithms: ['RS256'],
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${ authConfig.authority }/.well-known/jwks.json`
            })
        })
    }


    public async validate(payload: any) {
        this.logger.log(`Payload: ${ JSON.stringify(payload) }`);

        return { idUser: payload.sub, email: payload.email }
    }
}
