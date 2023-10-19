import api from '../_helpers/axios'

export class EntityBase {
	id: number | undefined
}

export default class GenericService<T extends EntityBase> {
	endpoint: string = ''

	constructor(recurse: string) {
		this.endpoint = recurse
	}

	save(item: T) {
		return api.post<T>(`/${this.endpoint}`, item)
	}

	update(item: T) {
		return api.put<T>(`/${this.endpoint}/${item.id}`, item)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	list(params: any) {
		if (params.limit < 0) params.limit = 0
		return api.get<T>(`/${this.endpoint}`, { params })
	}

	delete(id: number) {
		return api.delete(`/${this.endpoint}/${id}`)
	}

	findById(id: number) {
		return api.get<T>(`/${this.endpoint}/${id}`)
	}
}
