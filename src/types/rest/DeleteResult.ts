import { ApiProperty } from '@nestjs/swagger'

export class DeleteResult {
	/**
	 * Raw SQL result returned by executed query.
	 */
	@ApiProperty()
	raw: any
	/**
	 * Number of affected rows/documents
	 * Not all drivers support this
	 */
	@ApiProperty({ required: false, example: 1 })
	affected?: number | null
}
