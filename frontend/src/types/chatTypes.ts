export type TChatList = {
	id: number
	name: string
	lastMessage: TLastMessage
}

export type TLastMessage = {
	chatID: number
	content: string
	createdAt: Date
	edited: boolean
	id: number
	reply: string
	seenTime: Date
	userId: number
}
