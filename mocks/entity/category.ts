import { CategoryCreateDTO, CategoryUpdateDTO } from '#api/category/category.dto'
import { Category } from '#api/category/category.entity'

const mockCategory: Category = {
	id: 1,
	name: 'Mock Name',
}

const mockCreateCategoryDto: CategoryCreateDTO = {
	name: 'Mock Name',
}

const mockUpdateCategoryDto: CategoryUpdateDTO = {
	id: 1,
	name: 'Mock Name',
}

export function createCategoryDto() {
	return { ...mockCreateCategoryDto }
}

export function updateCategoryDto(id: number) {
	return { ...mockUpdateCategoryDto, id }
}

export function category(id: number) {
	return { ...mockCategory, id }
}
