import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ClientProxySmartRanking } from '../rmqproxy/client-proxy';
import { PlayerDTO } from './model/dtos/player.dto';
import { Observable } from 'rxjs';
import { UpdatePlayerDTO } from './model/dtos/update-player.dto';

@Injectable()
export class PlayersService {

    constructor(private readonly clientProxySmartRanking: ClientProxySmartRanking) {}

    private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

    private logger: Logger = new Logger(PlayersService.name);

    public async create(dto: PlayerDTO): Promise<void> {
        this.logger.log(`Player: ${ JSON.stringify(dto) }`);

        const category = await this.clientAdminBackend.send("consult-category", dto.category).toPromise();

        if(category) {
            await this.clientAdminBackend.emit("create-player", dto);
        } else {
            throw new BadRequestException("Category not found!");
        }
    }


    public async consult(email: string): Promise<Observable<any>> {
        return this.clientAdminBackend.send("consult-player", email ? email : "");
    }


    public async update(dto: PlayerDTO): Promise<void> {

        this.logger.log(`Player: ${ JSON.stringify(dto) }`);

        const category = await this.clientAdminBackend.send("consult-category", dto.category).toPromise();
        
        if(category) {
            await this.clientAdminBackend.emit("update-player", dto); 
        } else {
            throw new BadRequestException("Category not found!");
        }
    }


    public async update2(dto: UpdatePlayerDTO): Promise<void> {

        this.logger.log(`Player: ${ JSON.stringify(dto) }`);

        await this.clientAdminBackend.emit("update-player", dto); 

    }


    public async delete(email: string): Promise<void> {
        this.clientAdminBackend.emit("delete-player", email);
    }
}
