import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Type } from 'class-transformer'
import { Category } from '../category/category.entity'

@Entity('task')
export class Task {
	@PrimaryGeneratedColumn('increment')
	public id: number

	@Column({ type: 'varchar' })
	public description: string

	@Type(() => Date)
	@Column({ type: 'timestamp' })
	public date: Date

	@ManyToOne(() => Category, (c) => c.id, { nullable: false })
	@JoinColumn({ name: 'categoryId' })
	public category: Category

	@Column()
	public categoryId: number
}
