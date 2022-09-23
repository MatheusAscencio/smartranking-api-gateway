import { IsEmail, IsMobilePhone, IsString, Matches } from "class-validator";

export class RecordDTO {
    
    @IsString()
    readonly name: string;
    
    @IsEmail()
    readonly email: string;

    /*
        - Mínimo 8 caracteres
        - uma letera maiúscula
        - uma letra minuscula
        - um numero
    */
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'Invalid Password.' })
    readonly password: string;

    @IsMobilePhone("pt-BR")
    readonly phoneNumber: string;    
}