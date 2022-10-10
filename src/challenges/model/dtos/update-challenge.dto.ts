/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { ChallengeDTO } from "./challenge.dto";


export class UpdateChallengeDTO extends PartialType(ChallengeDTO){}