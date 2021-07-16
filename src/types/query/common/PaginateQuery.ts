import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class PaginationQuery {
	/** start after */
	@Optional()
	@ApiProperty({ required: false })
	skip?: number
	/** count of results*/
	@Optional()
	@ApiProperty({ required: false })
	take?: number
}
