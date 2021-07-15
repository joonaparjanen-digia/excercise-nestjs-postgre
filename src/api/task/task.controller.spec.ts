import { Test, TestingModule } from '@nestjs/testing'

import * as mock from '#jest-mocks'

import { TasksController } from './task.controller'
import { TasksService } from './task.service'
import { ConfigService } from '@nestjs/config'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Task } from './task.entity'

describe('TaskController', () => {
	let controller: TasksController

	beforeEach(async () => {
		const mockTask = { ...mock.task }

		const taskRepo = {
			create: jest.fn().mockResolvedValue(mockTask),
			save: jest.fn().mockReturnValue(Promise.resolve()),
		}

		const module: TestingModule = await Test.createTestingModule({
			controllers: [TasksController],
			providers: [
				TasksService,
				{
					provide: ConfigService,
					useValue: mock.configService,
				},
				{
					provide: getRepositoryToken(Task),
					useValue: taskRepo,
				},
			],
		}).compile()

		controller = module.get<TasksController>(TasksController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
