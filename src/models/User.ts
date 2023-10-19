export class User {
	id: number
	name: string
	email: string
	password: string

	constructor(id: number, email: string, password: string, name: string) {
		this.id = id
		this.email = email
		this.password = password
		this.name = name
	}
}
