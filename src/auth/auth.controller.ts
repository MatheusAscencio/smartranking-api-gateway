import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RecordDTO } from './DTOs/record.dto';
import { CognitoService } from 'src/aws/cognito.service';
import { LoginDTO } from './DTOs/login.dto';

@Controller('api/v1/auth')
export class AuthController {

    constructor(private cognitoService: CognitoService) {}

    @Post("/register")
    @UsePipes(ValidationPipe)
    async register(@Body() record: RecordDTO) {
        return await this.cognitoService.register(record);
    }


    @Post("/login")
    @UsePipes(ValidationPipe)
    async login(@Body() login: LoginDTO) {
        return await this.cognitoService.authenticate(login);
    }
}
