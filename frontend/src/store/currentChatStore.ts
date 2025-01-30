import { create } from 'zustand'

interface IChatUser {
	id: number
	name: string
	color: string
}

interface ICurrentChatStore {
	socket: WebSocket | null
	currentChatInfo: IChatUser | null
	setSocket: (socket: WebSocket) => void
	setCurrentChat: (user: IChatUser) => void
}

const useCurrentChatStore = create<ICurrentChatStore>(set => ({
	socket: null,
	currentChatInfo: null,
	setSocket: socket => set({ socket }),
	setCurrentChat: user => set({ currentChatInfo: user }),
}))

export default useCurrentChatStore
