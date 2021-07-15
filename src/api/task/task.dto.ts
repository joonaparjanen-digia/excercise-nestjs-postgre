import { PartialType } from '@nestjs/mapped-types'

export class CreateTaskDto {
	description: string
	date: Date
	categoryId: number
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
	id: number
	description: string
	date: Date
	categoryId: number
}
