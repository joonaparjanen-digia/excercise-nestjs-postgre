import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CategoryController } from './category.controller'
import { Category } from './category.entity'
import { CategoryService } from './category.service'
import * as mock from '#jest-mocks'
import { ConfigService } from '@nestjs/config'

describe('CategoryController', () => {
	let controller: CategoryController

	beforeEach(async () => {
		const mockCategory = { ...mock.category }

		const categoryRepo = {
			create: jest.fn().mockResolvedValue(mockCategory),
			save: jest.fn().mockReturnValue(Promise.resolve()),
		}

		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [
				CategoryService,
				{
					provide: ConfigService,
					useValue: mock.configService,
				},
				{
					provide: getRepositoryToken(Category),
					useValue: categoryRepo,
				},
			],
		}).compile()

		controller = module.get<CategoryController>(CategoryController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
