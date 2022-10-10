import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { queue } from 'rxjs';

@Injectable()
export class ClientProxySmartRanking{

    constructor(private config: ConfigService) {}

    public getClientProxyAdminBackendInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${ this.config.get<string>('RABBITMQ_USER') }:${ this.config.get<string>('RABBITMQ_SECRET') }@${ this.config.get<string>('RABBITMQ_URL') }`],
                queue: 'admin-backend'
            }
        });
    }


    public getClientProxyChallenges(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${ this.config.get<string>('RABBITMQ_USER') }:${ this.config.get<string>('RABBITMQ_SECRET') }@${ this.config.get<string>('RABBITMQ_URL') }`],
                queue: 'challenges'
            }
        });
    }
}
