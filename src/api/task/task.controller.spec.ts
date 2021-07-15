import { Test, TestingModule } from '@nestjs/testing'

import * as mock from '#jest-mocks'

import { TasksController } from './task.controller'
import { TasksService } from './task.service'
import { Task } from './task.entity'

import { mockTaskService } from './task.service.spec'

describe('TaskController', () => {
	let controller: TasksController
	let service: TasksService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TasksController],
			providers: [TasksService, mock.configService, mock.repository(Task, mock.task)],
		}).compile()

		controller = module.get<TasksController>(TasksController)
		service = await mockTaskService()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('create', async () => {
		const result = mock.task(1)
		jest.spyOn(service, 'create').mockImplementation(async () => result)
		expect(await controller.create(mock.createTaskDto())).toEqual(result)
	})

	it('find', async () => {
		const result = [mock.task(1), mock.task(2)]
		jest.spyOn(service, 'find').mockImplementation(async () => result)
		expect(await controller.find()).toEqual(result)
	})

	it('findOne', async () => {
		const result = mock.task(1)
		jest.spyOn(service, 'findOne').mockImplementation(async () => result)
		expect(await controller.findOne('1')).toEqual(result)
	})

	it('update', async () => {
		const result = mock.task(1)
		jest.spyOn(service, 'update').mockImplementation(async () => result)
		expect(await controller.update('1', mock.updateTaskDto(1))).toEqual(result)
	})

	it('remove', async () => {
		const result = { affected: 1, raw: {} }
		jest.spyOn(service, 'remove').mockImplementation(async () => result)
		expect(await controller.remove('1')).toEqual(result)
	})
})
