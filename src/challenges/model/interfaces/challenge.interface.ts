/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
import { Match } from "src/matches/model/interfaces/match.interface";
import { Player } from "src/players/model/interfaces/player.inteface";
import { ChallengeStatus } from "../enum/challenge-status.enum";


export interface Challenge extends Document{
    schedule: Date
    status: ChallengeStatus
    requestDate: Date
    responseDate: Date
    requester: Player
    category: string
    players: Array<Player>
    match: Match
}