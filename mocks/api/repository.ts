import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type'

export const repository = <E extends EntityClassOrSchema>(
	entity: E,
	entityData: (id: number) => Record<string, any>
): ValueProvider => ({
	provide: getRepositoryToken(entity),
	useValue: {
		create: jest.fn().mockResolvedValue(entityData(1)),
		save: jest.fn().mockReturnValue(Promise.resolve()),
		find: jest.fn().mockResolvedValue([entityData(1), entityData(2)]),
		findOne: jest.fn().mockResolvedValue(entityData(1)),
		update: jest.fn().mockReturnValue(Promise.resolve()),
		delete: jest.fn().mockResolvedValue({ affected: 1, raw: {} }),
	},
})
