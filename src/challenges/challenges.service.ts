import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { ChallengeDTO } from './model/dtos/challenge.dto';
import { Challenge } from './model/interfaces/challenge.interface';
import { ClientProxySmartRanking } from '../rmqproxy/client-proxy';
import { Observable } from 'rxjs';
import { UpdateChallengeDTO } from './model/dtos/update-challenge.dto';

@Injectable()
export class ChallengesService {

    constructor(private readonly clientProxySmartRanking: ClientProxySmartRanking) {}

    private readonly logger: Logger = new Logger(ChallengesService.name);

    private clientChallenge = this.clientProxySmartRanking.getClientProxyChallenges();


    public async create(dto: ChallengeDTO): Promise<void> {
        
        this.logger.log("Create Challenge Method Accessed!");
        
        try {
            await this.clientChallenge.emit("create-challenge", dto);
        } catch(error) {
            this.logger.error(`${ JSON.stringify(error.message) }`);
            throw new BadRequestException(error.message);
        }
    }


    public async consult(id: string): Promise<Observable<any>> {

        this.logger.log("Consult Challenge Method Accessed!");
        
        try {
            return this.clientChallenge.send("consult-challenge", id ? id : ""); 
        } catch(error) {
            this.logger.error(`${ JSON.stringify(error.message) }`);
            throw new NotFoundException(error.message);
        }
    }


    public async update(id: string, dto: UpdateChallengeDTO): Promise<void> {

        this.logger.log("Update Challenge Method Accessed!");

        try {
            const challenge = { id: id, dto: dto}

            this.clientChallenge.emit("update-challenge", challenge);
        } catch(error) {
            this.logger.error(`${ JSON.stringify(error.message) }`);
            throw new NotFoundException(error.message);
        }
    }


    public async delete(id: string): Promise<void> {

        this.logger.log("Delete Challenge Method Accessed!")

        try {
            this.clientChallenge.emit("delete-challenge", id);
        } catch(error) {
            this.logger.error(`${ JSON.stringify(error.message) }`);
            throw new NotFoundException(error.message);
        }
    }
}
