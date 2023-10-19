import { EntityBase } from '../services/generic.service'
import { Bot } from './Bot'

export class Chat extends EntityBase {
	chatId?: number
	username: string = ''
	type: string = ''
	bot?: Bot
}
