import { Body, Controller, Delete, Get, Logger, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayerDTO } from './model/DTOs/player.dto';
import { PlayersService } from './players.service';
import { Observable } from 'rxjs';


@Controller('api/v1/players')
export class PlayersController {
    
    constructor(private service: PlayersService) {}

    private logger: Logger = new Logger(PlayersController.name);

    @Post()
    @UsePipes(ValidationPipe)
    public async create(@Body() dto: PlayerDTO): Promise<void> {
        this.logger.log("Create Player API Accessed!");
        this.service.create(dto);
    }


    @Get()
    public async consult(@Query("email") email: string): Promise<Observable<any>> {
        this.logger.log("Consult Player API Accessed!");
        return this.service.consult(email);
    }


    @Put()
    @UsePipes(ValidationPipe)
    public async update(@Body() dto: PlayerDTO): Promise<void> {
        this.logger.log("Update Player API Accessed!");
        this.service.update(dto);
    }


    @Delete()
    @UsePipes(ValidationPipe)
    public async delete(@Query("email") email: string): Promise<void> {
        this.logger.log("Delete Player API Accessed!");
        this.service.delete(email);
    }
}
