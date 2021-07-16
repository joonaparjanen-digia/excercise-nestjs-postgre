import { PaginationQuery } from '#types'
import { Optional } from '@nestjs/common'
import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'

export class TaskCreateDTO {
	@ApiProperty()
	categoryId: number

	@ApiProperty()
	description: string

	@ApiProperty()
	date: string
}

export class TaskUpdateDTO extends PartialType(TaskCreateDTO) {
	@ApiProperty()
	id: number

	@Optional()
	@ApiProperty({ required: false })
	categoryId?: number

	@Optional()
	@ApiProperty({ required: false })
	description?: string

	@Optional()
	@ApiProperty({ required: false })
	date?: string
}

export class TaskQuery extends PaginationQuery {
	@Optional()
	@ApiProperty({ required: false })
	categoryId?: number
	/**date in ISO 8601 */
	@Optional()
	@ApiProperty({ required: false })
	dateMin?: string

	/**date in ISO 8601 */
	@Optional()
	@ApiProperty({ required: false })
	dateMax?: string
}
