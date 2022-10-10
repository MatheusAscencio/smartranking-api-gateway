import { PartialType } from "@nestjs/mapped-types";
import { CategoryDTO } from './category.dto';

export class UpdateCategoryDTO extends PartialType(CategoryDTO) {}