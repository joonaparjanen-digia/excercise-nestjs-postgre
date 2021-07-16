import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { CategoryCreateDTO, CategoryUpdateDTO } from './category.dto'
import { Category } from './category.entity'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private repository: Repository<Category>
	) {}

	async create(Category: CategoryCreateDTO) {
		const newCategory = this.repository.create(Category)
		await this.repository.save(newCategory)
		return newCategory
	}

	async find(options?: FindManyOptions<Category>) {
		return this.repository.find(options)
	}

	async findOne(id: number) {
		const Category = await this.repository.findOne(id)
		/* istanbul ignore next */
		if (!Category) throw new HttpException(`Category[${id}] not found`, HttpStatus.NOT_FOUND)
		return Category
	}

	async update(id: number, Category: CategoryUpdateDTO) {
		await this.repository.update(id, Category)
		return this.findOne(id)
	}

	async remove(id: number) {
		const res = await this.repository.delete(id)
		/* istanbul ignore next */
		if (!res.affected) throw new HttpException(`Category[${id}] not found`, HttpStatus.NOT_FOUND)
		return res
	}
}
