/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Logger, Body, ValidationPipe, UsePipes, Post, Get, Query } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CategoryDTO } from './categories/model/DTOs/category.dto';

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;
  
  constructor() {
    
  }

  @Post('categories')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() dto: CategoryDTO) {
    return await this.clientAdminBackend.emit('create-category', dto);
  }

  @Get('categories')
  consultCategory(@Query('id') id: string) {
    return this.clientAdminBackend.send('consult-category', id ? id : '')
  }

}
