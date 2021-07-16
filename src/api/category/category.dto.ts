import { Optional } from '@nestjs/common'
import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'

export class CategoryCreateDTO {
	@ApiProperty()
	name: string
}

export class CategoryUpdateDTO extends PartialType(CategoryCreateDTO) {
	@ApiProperty()
	id: number
	@Optional()
	@ApiProperty({ required: false })
	name?: string
}
