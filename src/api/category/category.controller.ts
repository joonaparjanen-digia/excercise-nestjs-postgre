import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryCreateDTO, CategoryUpdateDTO } from './category.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Category } from './category.entity'
import { DeleteResult } from '#types'

@ApiTags('category')
@Controller('category')
export class CategoryController {
	constructor(private readonly service: CategoryService) {}

	@Post()
	@ApiResponse({
		status: HttpStatus.CREATED,
		type: Category,
	})
	create(@Body() createCategoryDto: CategoryCreateDTO) {
		return this.service.create(createCategoryDto)
	}

	@Get()
	@ApiResponse({
		status: HttpStatus.OK,
		type: [Category],
	})
	find() {
		return this.service.find()
	}

	@Get(':id')
	@ApiResponse({
		status: HttpStatus.OK,
		type: Category,
	})
	findOne(@Param('id') id: string) {
		return this.service.findOne(+id)
	}

	@Patch(':id')
	@ApiResponse({
		status: HttpStatus.OK,
		type: Category,
	})
	update(@Param('id') id: string, @Body() updateCategoryDto: CategoryUpdateDTO) {
		return this.service.update(+id, updateCategoryDto)
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
