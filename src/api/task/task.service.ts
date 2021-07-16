import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { queryHelper } from '#utils'

import { TaskCreateDTO, TaskUpdateDTO } from './task.dto'
import { Task } from './task.entity'
import { TaskQuery } from './task.dto'

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private repository: Repository<Task>
	) {}

	async create(task: TaskCreateDTO) {
		const newTask = this.repository.create(task)
		await this.repository.save(newTask)
		return newTask
	}

	async find(query: TaskQuery) {
		const { categoryId, dateMin, dateMax } = query
		let q = this.repository.createQueryBuilder()

		if (categoryId) {
			q = q.where('Task.categoryId = :categoryId', { categoryId })
		}

		if (dateMin > dateMax)
			throw new HttpException('Bad Query: dateMax cannot be less than dateMin', HttpStatus.BAD_REQUEST)

		q = queryHelper.whereDateRange(q, 'date', [dateMin, dateMax], categoryId === undefined ? undefined : 'and')
		q = queryHelper.paginate(q, query)

		return await q.getMany()
	}

	async findOne(id: number) {
		const task = await this.repository.findOne(id)
		/* istanbul ignore next */
		if (!task) throw new HttpException(`Task[${id}] not found`, HttpStatus.NOT_FOUND)
		return task
	}

	async update(id: number, task: TaskUpdateDTO) {
		await this.repository.update(id, task)
		return this.findOne(id)
	}

	async remove(id: number) {
		const res = await this.repository.delete(id)
		/* istanbul ignore next */
		if (!res.affected) throw new HttpException(`Task[${id}] not found`, HttpStatus.NOT_FOUND)
		return res
	}
}
