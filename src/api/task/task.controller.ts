import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TasksService } from './task.service'
import { CreateTaskDto, UpdateTaskDto } from './task.dto'

@Controller('task')
export class TasksController {
	constructor(private readonly service: TasksService) {}

	@Post()
	create(@Body() task: CreateTaskDto) {
		return this.service.create(task)
	}

	@Get()
	find() {
		return this.service.find()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.service.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() task: UpdateTaskDto) {
		return this.service.update(+id, task)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.service.remove(+id)
	}
}
