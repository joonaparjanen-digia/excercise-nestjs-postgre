import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('category')
export class Category {
	@PrimaryGeneratedColumn('increment')
	@ApiProperty()
	public id: number

	@Column({ type: 'varchar' })
	@ApiProperty()
	public name: string
}
