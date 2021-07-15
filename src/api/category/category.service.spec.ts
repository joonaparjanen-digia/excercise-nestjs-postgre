import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import * as mock from '#jest-mocks'

import { CategoryService } from './category.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Category } from './category.entity'

describe('CategoryService', () => {
	let service: CategoryService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoryService,
				{
					provide: ConfigService,
					useValue: mock,
				},
				{
					provide: getRepositoryToken(Category),
					useValue: {},
				},
			],
		}).compile()

		service = module.get<CategoryService>(CategoryService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
