import { EntityBase } from '../services/generic.service'
import { Bot } from './Bot'
import { Chat } from './Chat'

export class Message extends EntityBase {
	messageId?: number
	text?: string
	sender?: string
	senderUsername?: string
	isBot?: boolean
	timestamp?: Date
	bot?: Bot
	chat?: Chat
}
