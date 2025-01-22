import { create } from 'zustand'

interface User {
	id: string
	name: string
	avatar?: string // Add any other properties your user object may have
}

interface SocketStore {
	socket: WebSocket | null // Replace with your socket type if not WebSocket
	currentChat: User | null
	setSocket: (socket: WebSocket) => void
	setCurrentChat: (user: User) => void
	resetChat: () => void
}

const useSocketStore = create<SocketStore>(set => ({
	socket: null,
	currentChat: null,
	setSocket: socket => set({ socket }),
	setCurrentChat: user => set({ currentChat: user }),
	resetChat: () => set({ currentChat: null }),
}))

export default useSocketStore
