import { CreateTaskDto, UpdateTaskDto } from '#api/task/task.dto'
import { Task } from '#api/task/task.entity'

const DEF_DESC = 'Mock description'
const DEF_DATE = '2021-12-01T12:35:00.000Z'

const UPD_DESC = 'UPDATED description'
const UPD_DATE = '1111-11-11T11:11:11.111Z'

export function task(id: number, categoryId = 1): Task {
	return {
		id,
		description: DEF_DESC,
		date: DEF_DATE,
		categoryId,
	}
}

export function createTaskDto(categoryId = 1): CreateTaskDto {
	return {
		description: DEF_DESC,
		date: DEF_DATE,
		categoryId,
	}
}

export function updateTaskDto(id: number, categoryId = 1): UpdateTaskDto {
	return {
		id,
		description: UPD_DESC,
		date: UPD_DATE,
		categoryId,
	}
}
