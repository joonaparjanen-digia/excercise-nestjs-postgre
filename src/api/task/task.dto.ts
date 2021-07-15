import { PartialType } from '@nestjs/mapped-types'

export class CreateTaskDto {
	description: string
	date: string
	categoryId: number
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
	id: number
	description: string
	date: string
	categoryId: number
}
