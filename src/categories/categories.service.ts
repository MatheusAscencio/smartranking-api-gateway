import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from 'src/rmqproxy/client-proxy';
import { CategoryDTO } from './model/DTOs/category.dto';

@Injectable()
export class CategoriesService {

    constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

    private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

    private logger: Logger = new Logger(CategoriesService.name);


    public async create(dto: CategoryDTO): Promise<void> {
        this.logger.log(`Category: ${ JSON.stringify(dto) }`);
        this.clientAdminBackend.emit("create-category", dto);
    }


    public async consult(name: string): Promise<Observable<any>> {
        this.logger.log(`Category: ${ name }`);
        return this.clientAdminBackend.send("consult-category", name ? name : "");
    }

    
    public async update(name: string): Promise<void> {
        this.logger.log(`Category: ${ name }`);
        this.clientAdminBackend.emit("update-category", name);
    }

    public async delete(name: string): Promise<void> {
        this.logger.log(`Category: ${ name }`);
        this.clientAdminBackend.emit("delete-category", name);
    }
}
