import request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AppModule } from '#api/app.module'

import * as mock from '#jest-mocks'
import { TaskQuery } from './task.dto'

type TaskQueryTest = [label: string, query: TaskQuery | undefined, expectedCode: number]

const taskQueries: TaskQueryTest[] = [
	['all', undefined, HttpStatus.OK],
	['by categoryId', { categoryId: 7 }, HttpStatus.OK],
	['by dateMin', { dateMin: '2011.11.11' }, HttpStatus.OK],
	['by dateMax', { dateMin: '2022.11.11' }, HttpStatus.OK],
	['by dateMin & dateMax', { dateMin: '2011.11.11', dateMax: '2022.11.11' }, HttpStatus.OK],
	[
		'by every param',
		{ categoryId: 7, dateMin: '2011.11.11', dateMax: '2022.11.11', skip: 4, take: 2 },
		HttpStatus.OK,
	],
	['by dateMin > dateMax', { dateMin: '2022.11.11', dateMax: '2011.11.11' }, HttpStatus.BAD_REQUEST],
]

describe('TaskModule (e2e)', () => {
	let app: INestApplication = null

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	describe('/task', () => {
		let taskId: number = null
		let categoryId: number = null

		beforeAll(async () => {
			// create category that each task uses
			const dto = mock.createCategoryDto()
			const res = await request(app.getHttpServer()).post('/category').send(dto)

			categoryId = res.body.id
		})

		it('POST', async () => {
			const dto = mock.createTaskDto(categoryId)
			const res = await request(app.getHttpServer()).post('/task').send(dto)
			expect(res.statusCode).toBe(HttpStatus.CREATED)
			taskId = res.body.id
			expect(res.body).toEqual(mock.task(taskId, categoryId))
		})

		describe('GET', () => {
			for (let i = 0; i < taskQueries.length; i++) {
				const [label, queryParams, status] = taskQueries[i]
				it(label, async () => {
					await request(app.getHttpServer()).get('/task').query(queryParams).send().expect(status)
				})
			}
		})

		it('GET:id', async () => {
			await request(app.getHttpServer())
				.get(`/task/${taskId}`)
				.send()
				.expect(HttpStatus.OK, mock.task(taskId, categoryId))
		})

		it('PATCH:id', async () => {
			const dto = mock.updateTaskDto(taskId, categoryId)
			const res = await request(app.getHttpServer()).patch(`/task/${taskId}`).send(dto)
			expect(res.statusCode).toBe(HttpStatus.OK)
			expect(res.body).toEqual(dto)
		})

		it('DELETE:id', async () => {
			const res = await request(app.getHttpServer()).delete(`/task/${taskId}`).send()
			expect(res.statusCode).toBe(HttpStatus.OK)
		})

		afterAll(async () => {
			await request(app.getHttpServer()).delete(`/category/${categoryId}`).send()
		})
	})
})
