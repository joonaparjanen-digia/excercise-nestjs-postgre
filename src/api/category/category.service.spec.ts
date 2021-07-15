import * as mock from '#jest-mocks'
import { Test } from '@nestjs/testing'
import { Category } from './category.entity'

import { CategoryService } from './category.service'

describe('CategoryService', () => {
	let service: CategoryService

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [CategoryService, mock.configService, mock.repository(Category, mock.category)],
		}).compile()
		service = module.get(CategoryService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
