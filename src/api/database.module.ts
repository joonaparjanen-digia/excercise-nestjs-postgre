import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Task } from './task/task.entity'
import { Category } from './category/category.entity'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const config: TypeOrmModuleOptions = {
					type: 'postgres',
					host: configService.get('POSTGRES_HOST'),
					port: configService.get('POSTGRES_PORT'),
					username: configService.get('POSTGRES_USER'),
					password: configService.get('POSTGRES_PASSWORD'),
					database: configService.get('POSTGRES_DB'),
					entities: [Category, Task],
					synchronize: true,
				}

				console.log('TypeOrmModuleOptions: ', config)

				return config
			},
		}),
	],
})
export class DatabaseModule {}
