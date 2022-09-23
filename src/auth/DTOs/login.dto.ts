import { IsEmail, Matches } from "class-validator";

export class LoginDTO {

    @IsEmail()
    email: string;

    /*
        - Mínimo 8 caracteres
        - uma letera maiúscula
        - uma letra minuscula
        - um numero
    */
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'Invalid Password.' })
    password: string;
}