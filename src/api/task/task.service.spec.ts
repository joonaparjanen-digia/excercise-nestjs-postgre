import { Test, TestingModule } from '@nestjs/testing'
import * as mock from '#jest-mocks'

import { TasksService } from './task.service'
import { Task } from './task.entity'

export const mockTaskService = async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [TasksService, mock.configService, mock.repository(Task, mock.task)],
	}).compile()
	return module.get<TasksService>(TasksService)
}

describe('TaskService', () => {
	let service: TasksService

	beforeEach(async () => {
		service = await mockTaskService()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
