import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import * as mock from '#jest-mocks'

import { TasksService } from './task.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Task } from './task.entity'

describe('TaskService', () => {
	let service: TasksService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TasksService,
				{
					provide: ConfigService,
					useValue: mock.configService,
				},
				{
					provide: getRepositoryToken(Task),
					useValue: {},
				},
			],
		}).compile()

		service = module.get<TasksService>(TasksService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
