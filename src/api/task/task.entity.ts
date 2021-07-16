import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm'
import { Type } from 'class-transformer'
import { Category } from '../category/category.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('task')
export class Task {
	@PrimaryGeneratedColumn('increment')
	@ApiProperty()
	public id: number

	@Column({ type: 'varchar' })
	@ApiProperty()
	public description: string

	@Index('task_timestamp')
	@Type(/* istanbul ignore next */ () => Date)
	@Column({ type: 'timestamp' })
	@ApiProperty()
	public date: string

	@ManyToOne(/* istanbul ignore next */ () => Category, /* istanbul ignore next */ (c) => c.id, { nullable: false })
	@JoinColumn({ name: 'categoryId' })
	public category?: Category

	@Index('task_categoryId')
	@Column()
	@ApiProperty()
	public categoryId: number
}
