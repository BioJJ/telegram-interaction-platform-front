import { EntityBase } from '../services/generic.service'

export class Bot extends EntityBase {
	telegramId?: number
	username: string = ''
	name: string = ''
	status?: boolean
}
