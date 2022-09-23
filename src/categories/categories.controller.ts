import { Controller, Post, Logger, UsePipes, ValidationPipe, Body, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { CategoryDTO } from './model/DTOs/category.dto';
import { Observable } from 'rxjs';
import { CategoriesService } from './categories.service';


@Controller('api/v1/categories')
export class CategoriesController {

    constructor(private service: CategoriesService) {}

    private logger: Logger = new Logger(CategoriesController.name);


    @Post()
    @UsePipes(ValidationPipe)
    public async create(@Body() dto: CategoryDTO): Promise<void> {
        this.logger.log("Create Category API Accessed!");
        
        
        this.service.create(dto)
    }

    @Get()
    public async consult(@Query('name') name: string): Promise<Observable<any>> {
        this.logger.log("Consult Category API Accessed!");
        return this.service.consult(name);
    }

    @Put("/:name")
    @UsePipes(ValidationPipe)
    public async update(@Param('name') name: string): Promise<void> {
        this.logger.log("Update Category API Accessed!");
        this.service.update(name);
    }

    @Delete("/:name")
    public async delete(@Param("name") name: string): Promise<void> {
        this.logger.log("Delete Category API Accessed!");
        this.service.delete(name)
    }
}

