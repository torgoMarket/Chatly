export type TChatList = {
	id: number
	name: string
	color: string
	nickName: string
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

export type TChatHistory = {
	id: number
	chatId: number
	userId: number
	content: string
	createdAt: EpochTimeStamp
	seenTime: EpochTimeStamp
	edited: boolean
	reply: string
}
