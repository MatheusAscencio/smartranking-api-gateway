/* eslint-disable prettier/prettier */
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator";
import { Player } from "src/players/model/interfaces/player.inteface";
import { ChallengeStatus } from "../enum/challenge-status.enum";


export class ChallengeDTO {
    
    @IsNotEmpty()
    @IsDateString()
    schedule: Date;
    
    @IsNotEmpty()
    requester: Player;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    players: Array<Player>;

    @IsNotEmpty()
    status: ChallengeStatus;

}