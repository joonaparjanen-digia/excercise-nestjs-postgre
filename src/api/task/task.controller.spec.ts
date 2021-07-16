import { Test, TestingModule } from '@nestjs/testing'

import * as mock from '#jest-mocks'

import { TasksController } from './task.controller'
import { TasksService } from './task.service'
import { Task } from './task.entity'

describe('TaskController', () => {
	let controller: TasksController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TasksController],
			providers: [TasksService, mock.configService, mock.repository(Task, mock.task)],
		}).compile()

		controller = module.get<TasksController>(TasksController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('create', async () => {
		const result = mock.task(1)
		expect(await controller.create(mock.createTaskDto())).toEqual(result)
	})

	describe('find', () => {
		it('no params', async () => {
			const result = [mock.task(1), mock.task(2)]
			expect(await controller.find()).toEqual(result)
		})

		it('only pagination', async () => {
			const result = [mock.task(1), mock.task(2)]
			expect(await controller.find({ skip: 2, take: 2 })).toEqual(result)
		})

		it('only categoryId', async () => {
			const result = [mock.task(1), mock.task(2)]
			expect(await controller.find({ categoryId: 4 })).toEqual(result)
		})

		it('only minDate', async () => {
			const result = [mock.task(1), mock.task(2)]
			expect(await controller.find({ dateMin: new Date('2011.11.11').toISOString() })).toEqual(result)
		})

		it('only maxDate', async () => {
			const result = [mock.task(1), mock.task(2)]
			expect(await controller.find({ dateMax: new Date('2222.11.11').toISOString() })).toEqual(result)
		})

		it('only date range', async () => {
			const result = [mock.task(1), mock.task(2)]
			expect(
				await controller.find({
					dateMin: new Date('2011.11.11').toISOString(),
					dateMax: new Date('2222.11.11').toISOString(),
				})
			).toEqual(result)
		})

		it('categoryId & date range', async () => {
			const result = [mock.task(1), mock.task(2)]
			expect(
				await controller.find({
					categoryId: 5,
					dateMin: new Date('2011.11.11').toISOString(),
					dateMax: new Date('2222.11.11').toISOString(),
				})
			).toEqual(result)
		})
	})

	it('findOne', async () => {
		const result = mock.task(1)
		expect(await controller.findOne('1')).toEqual(result)
	})

	it('update', async () => {
		const result = mock.task(1)
		expect(await controller.update('1', mock.updateTaskDto(1))).toEqual(result)
	})

	it('remove', async () => {
		const result = { affected: 1, raw: {} }
		expect(await controller.remove('1')).toEqual(result)
	})
})
