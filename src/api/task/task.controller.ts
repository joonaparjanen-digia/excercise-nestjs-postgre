import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common'
import { TaskQuery } from './task.dto'

import { TasksService } from './task.service'
import { TaskCreateDTO, TaskUpdateDTO } from './task.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Task } from './task.entity'
import { DeleteResult } from '#types'

@ApiTags('task')
@Controller('task')
export class TasksController {
	queryBuilder: any

	constructor(private readonly service: TasksService) {}

	@Post()
	@ApiResponse({
		status: HttpStatus.CREATED,
		type: Task,
	})
	create(@Body() task: TaskCreateDTO) {
		return this.service.create(task)
	}

	@Get()
	@ApiResponse({
		status: HttpStatus.OK,
		type: [Task],
	})
	find(@Query() query: TaskQuery = {}) {
		return this.service.find(query)
	}

	@Get(':id')
	@ApiResponse({
		status: HttpStatus.OK,
		type: Task,
	})
	findOne(@Param('id') id: string) {
		return this.service.findOne(+id)
	}

	@Patch(':id')
	@ApiResponse({
		status: HttpStatus.OK,
		type: Task,
	})
	update(@Param('id') id: string, @Body() task: TaskUpdateDTO) {
		return this.service.update(+id, task)
	}

	@Delete(':id')
	@ApiResponse({
		status: HttpStatus.OK,
		type: DeleteResult,
	})
	remove(@Param('id') id: string) {
		return this.service.remove(+id)
	}
}
