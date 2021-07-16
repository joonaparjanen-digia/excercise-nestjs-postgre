import request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AppModule } from '#api/app.module'

import * as mock from '#jest-mocks'

describe('CategoryModule (e2e)', () => {
	let app: INestApplication = null

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	describe('/category', () => {
		let categoryId: number = null

		it('POST', async () => {
			const dto = mock.createCategoryDto()
			const res = await request(app.getHttpServer()).post('/category').send(dto)
			expect(res.statusCode).toBe(HttpStatus.CREATED)
			categoryId = res.body.id
			expect(res.body).toEqual(mock.category(categoryId))
		})

		it('GET', async () => {
			await request(app.getHttpServer()).get('/category').send().expect(HttpStatus.OK)
		})

		it('GET:id', async () => {
			await request(app.getHttpServer())
				.get(`/category/${categoryId}`)
				.send()
				.expect(HttpStatus.OK, mock.category(categoryId))
		})

		it('PATCH:id', async () => {
			const dto = mock.updateCategoryDto(categoryId)
			const res = await request(app.getHttpServer()).patch(`/category/${categoryId}`).send(dto)
			expect(res.statusCode).toBe(HttpStatus.OK)
			expect(res.body).toEqual(dto)
		})

		it('DELETE:id', async () => {
			const res = await request(app.getHttpServer()).delete(`/category/${categoryId}`).send()
			expect(res.statusCode).toBe(HttpStatus.OK)
		})
	})
})
