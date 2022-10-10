/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
import { Player } from "src/player/model/interfaces/player.interface";
import { Result } from "./result.interface";

export interface Match extends Document{
    category: string
    players: Array<Player>
    def: Player
    result: Result    
}