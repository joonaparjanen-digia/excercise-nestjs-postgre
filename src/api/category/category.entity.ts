import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('category')
export class Category {
	@PrimaryGeneratedColumn('increment')
	public id: number

	@Column({ type: 'varchar' })
	public name: string
}
