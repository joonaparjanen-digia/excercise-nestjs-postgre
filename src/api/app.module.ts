import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

import { DatabaseModule } from './database.module'
import { TasksModule } from './task/task.module'
import { CategoryModule } from './category/category.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				POSTGRES_HOST: Joi.string().required(),
				POSTGRES_PORT: Joi.number().required(),
				POSTGRES_USER: Joi.string().required(),
				POSTGRES_PASSWORD: Joi.string().required(),
				POSTGRES_DB: Joi.string().required(),
				PORT: Joi.number(),
			}),
		}),
		TasksModule,
		CategoryModule,
		DatabaseModule,
	],
})
export class AppModule {}
