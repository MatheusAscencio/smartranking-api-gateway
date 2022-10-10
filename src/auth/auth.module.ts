import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsModule } from '../aws/aws.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    AwsModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [JwtStrategy]
})
export class AuthModule {}
