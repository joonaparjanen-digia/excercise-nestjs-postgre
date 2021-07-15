import { Task } from '#api/task/task.entity'
import { Category } from '#api/category/category.entity'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ValueProvider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export const configService: ValueProvider<TypeOrmModuleOptions> = {
	provide: ConfigService,
	useValue: {
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'admin',
		password: 'admin',
		database: 'nestjs',
		entities: [Category, Task],
		synchronize: true,
	},
}
