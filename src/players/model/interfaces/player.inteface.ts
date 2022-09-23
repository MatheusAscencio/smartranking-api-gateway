/* eslint-disable prettier/prettier */

import { Document } from "mongoose";

export interface Player extends Document {
    readonly email: string;
    readonly phoneNumber: string;
    name: string;
    ranking: string;
    rankingPosition: number;
    urlPlayerPhoto: string;
}