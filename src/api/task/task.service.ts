import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateTaskDto, UpdateTaskDto } from './task.dto'
import { Task } from './task.entity'

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private repository: Repository<Task>
	) {}

	async create(task: CreateTaskDto) {
		const newTask = this.repository.create(task)
		await this.repository.save(newTask)
		return newTask
	}

	findAll(options?: FindManyOptions<Task>) {
		return this.repository.find(options)
	}

	async findOne(id: number) {
		const task = await this.repository.findOne(id)
		if (!task) throw new HttpException(`Task[${id}] not found`, HttpStatus.NOT_FOUND)
		return task
	}

	async update(id: number, task: UpdateTaskDto) {
		await this.repository.update(id, task)
		return this.findOne(id)
	}

	async remove(id: number) {
		const res = await this.repository.delete(id)
		if (!res.affected) throw new HttpException(`Task[${id}] not found`, HttpStatus.NOT_FOUND)
		return res
	}
}
