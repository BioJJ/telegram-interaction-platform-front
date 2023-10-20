import { EntityBase } from '../services/generic.service'

export class MessageSend extends EntityBase {
	chatId?: number
	messageText?: string
}
