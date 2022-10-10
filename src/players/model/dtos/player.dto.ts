import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class PlayerDTO {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly category: string;

    @IsString()
    photo: string;
}