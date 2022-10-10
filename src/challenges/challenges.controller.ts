import { Controller, Logger, Post, UsePipes, ValidationPipe, BadRequestException, Body, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChallengesService } from './challenges.service';
import { ChallengeDTO } from './model/dtos/challenge.dto';
import { Challenge } from './model/interfaces/challenge.interface';
import { UpdateChallengeDTO } from './model/dtos/update-challenge.dto';

@Controller('api/v1/challenges')
export class ChallengesController {

    constructor(private readonly service: ChallengesService) {}

    private readonly logger: Logger = new Logger(ChallengesController.name);


    //CRUD
    @Post()
    @UsePipes(ValidationPipe)
    public async create(@Body() dto: ChallengeDTO): Promise<void> {
        
        this.logger.log("Create Challenge API Accessed!");
        
        try {
            this.service.create(dto);
        } catch(error) {
            this.logger.error(`${ JSON.stringify(error.message) }`);
            throw new BadRequestException(error.message);
        }
    }


    @Get("/:id")
    @UsePipes(ValidationPipe)
    public async consult(@Query("id") id: string): Promise<Observable<any>> {

        this.logger.log("Consult Challenge API Accessed!");

        try {
            return this.service.consult(id);
        } catch(error) {
            this.logger.error(`${ JSON.stringify(error.message) }`);
            throw new BadRequestException(error.message);
        }
    }


    @Put("/:id")
    @UsePipes(ValidationPipe)
    public async update(@Param("id") id: string, @Body() dto: UpdateChallengeDTO): Promise<void> {

        this.logger.log("Update Challenge API Accessed!");

        try {
            return this.service.update(id, dto);
        } catch(error) {
            this.logger.error(`${ JSON.stringify(error.message) }`);
            throw new BadRequestException(error.message);
        }
    }


    @Delete("/:id")
    @UsePipes(ValidationPipe)
    public async delete(@Param("id") id: string): Promise<void> {
        
        this.logger.log("Delete Challenge API Accessed!");

        try {
            this.service.delete(id);
        } catch(error) {
            this.logger.error(`${ JSON.stringify(error.message) }`);
            throw new BadRequestException(error.message);
        }
    }



    //Methods
    @Post("/:id/match")
    public async attachChallenge() {}
}
