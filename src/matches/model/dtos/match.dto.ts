/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator"
import { Player } from "src/player/model/interfaces/player.interface"
import { Result } from "../interfaces/result.interface"

export class MatchDTO {

    @IsNotEmpty()
    def: Player

    @IsNotEmpty()
    result: Array<Result>
    
}