import { Body, Controller, Delete, Get, Logger, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { PlayerDTO } from './model/dtos/player.dto';
import { PlayersService } from './players.service';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePlayerDTO } from './model/dtos/update-player.dto';
import { S3Service } from 'src/aws/s3.service';


@Controller('api/v1/players')
export class PlayersController {
    
    constructor(private service: PlayersService, private s3: S3Service) {}

    private logger: Logger = new Logger(PlayersController.name);


    //CRUD
    @Post()
    @UsePipes(ValidationPipe)
    public async create(@Body() dto: PlayerDTO): Promise<void> {
        this.logger.log("Create Player API Accessed!");
        this.service.create(dto);
    }


    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async consult(@Req() req: Request, @Query("email") email: string): Promise<Observable<any>> {
        this.logger.log("Consult Player API Accessed!");
        this.logger.log(`Req: ${ JSON.stringify(req.user) }`);
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


    //Methods
    @Post("/upload")
    @UseInterceptors(FileInterceptor("file"))
    public async uploadFile(@UploadedFile() file, @Query("email") email: string) {
        
        this.logger.log(file);

        const player = await this.service.consult(email)

        if(!player) {
            throw new BadRequestException(`Player not Found: ${ email }`);
        }

        const photo = await this.s3.uploadFile(file, email);

        let dto: UpdatePlayerDTO;

        dto.photo = photo.url;

        await this.service.update2(dto);
        
        return this.service.consult(email);

    }
}
