import { Between, MoreThan, LessThan, SelectQueryBuilder, Brackets, ObjectLiteral } from 'typeorm'

export function whereDateRange<T>(
	queryBuilder: SelectQueryBuilder<T>,
	field: string,
	range: [min?: string, max?: string],
	logic?: 'and' /* | 'or'*/
): SelectQueryBuilder<T> {
	const [_min, _max] = range
	let op: ObjectLiteral = null

	const min = _min ? new Date(_min).toISOString() : undefined
	const max = _max ? new Date(_max).toISOString() : undefined

	if (min && max) op = { [field]: Between(min, max) }
	else if (min) op = { [field]: MoreThan(min) }
	else if (max) op = { [field]: LessThan(max) }

	if (min || max) {
		switch (logic) {
			case 'and':
				return queryBuilder.andWhere(new Brackets((qb) => qb.where(op)))

			/*
			case 'or':
				return queryBuilder.orWhere(new Brackets((qb) => qb.where(op)))
			*/

			default:
				return queryBuilder.where(op)
		}
	}

	return queryBuilder
}
