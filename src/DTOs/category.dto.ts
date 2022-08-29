/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { Event } from '../interfaces/event.interface';

export class CategoryDTO {
    
    @IsString()
    @IsNotEmpty()
    readonly category: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>

}