import { Task } from '#api/task/task.entity'
import { Category } from '#api/category/category.entity'

export const configService = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'admin',
	password: 'admin',
	database: 'nestjs',
	entities: [Category, Task],
	synchronize: true,
}
