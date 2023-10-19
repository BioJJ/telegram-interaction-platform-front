export default class Pagination {
	page?: number
	size?: number
	sortBy?: string

	static build() {
		const obj = new Pagination()
		obj.size = 10
		obj.page = 0
		obj.sortBy = 'id'
		return obj
	}
}
