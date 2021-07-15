import { PartialType } from '@nestjs/mapped-types'

export class CreateCategoryDto {}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
