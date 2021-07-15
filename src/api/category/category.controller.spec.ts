import { Test, TestingModule } from '@nestjs/testing'
import * as mock from '#jest-mocks'

import { CategoryController } from './category.controller'
import { Category } from './category.entity'
import { CategoryService } from './category.service'

describe('CategoryController', () => {
	let controller: CategoryController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [CategoryService, mock.configService, mock.repository(Category, mock.category)],
		}).compile()

		controller = module.get<CategoryController>(CategoryController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('create', async () => {
		const result = mock.category(1)
		expect(await controller.create(mock.createCategoryDto())).toEqual(result)
	})

	it('find', async () => {
		const result = [mock.category(1), mock.category(2)]
		expect(await controller.find()).toEqual(result)
	})

	it('findOne', async () => {
		const result = mock.category(1)
		expect(await controller.findOne('1')).toEqual(result)
	})

	it('update', async () => {
		const result = mock.category(1)
		expect(await controller.update('1', mock.updateCategoryDto(1))).toEqual(result)
	})

	it('remove', async () => {
		const result = { affected: 1, raw: {} }
		expect(await controller.remove('1')).toEqual(result)
	})
})
