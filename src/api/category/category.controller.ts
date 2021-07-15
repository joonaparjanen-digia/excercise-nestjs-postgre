import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly service: CategoryService) {}

	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.service.create(createCategoryDto)
	}

	@Get()
	findAll() {
		return this.service.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.service.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return this.service.update(+id, updateCategoryDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.service.remove(+id)
	}
}
