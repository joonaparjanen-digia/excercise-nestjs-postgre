import { PaginationQuery } from '#types'
import { SelectQueryBuilder } from 'typeorm'

export function paginate<T>(queryBuilder: SelectQueryBuilder<T>, query: PaginationQuery): SelectQueryBuilder<T> {
	return queryBuilder.skip(query.skip ?? 0).take(query.take ?? 10)
}
