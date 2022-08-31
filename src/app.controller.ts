/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Logger, Body, ValidationPipe, UsePipes, Post, Get, Query } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CategoryDTO } from './DTOs/category.dto';

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;
  
  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:bitnami@localhost:5672/smartranking'],
        queue: 'admin-backend'
      }
    })
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
