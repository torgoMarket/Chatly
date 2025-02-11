import { Check, CheckCheck } from 'lucide-react'
import { $api } from '../../../api'
import useCurrentChatStore from '../../../store/currentChatStore'
import { TChatList, TLastMessage } from '../../../types/chatTypes'
import { TUser } from '../../../types/userTypes'
import { keysToCamelCaseInObjectOfArray } from '../../../utils/request'
import { Avatar } from '../../UI/Avatar/Avatar'
import styles from './ChatListItem.module.scss'

interface IChatListItemProps {
	search: boolean
	loggedUserId: number
	chatUser: TChatList | TUser
	lastMessage: TLastMessage
	toggleSidebar: () => void
}

export const ChatListItem: React.FC<IChatListItemProps> = ({
	search,
	loggedUserId,
	chatUser,
	lastMessage = {},
	toggleSidebar,
}) => {
	const setSocket = useCurrentChatStore(state => state.setSocket)
	const storedSocket = useCurrentChatStore(state => state.socket)
	const setCurrentChat = useCurrentChatStore(state => state.setCurrentChat)

	const generateId = (chatUserId: number, loggedUserId: number) => {
		let a = chatUserId
		let b = loggedUserId
		if (a > b) {
			;[a, b] = [b, a]
		}
		return ((a + b) * (a + b + 1)) / 2 + b
	}

	const switchChat = async () => {
		toggleSidebar()
		storedSocket?.close()
		const { data } = (await $api.get('/ws/getrooms')) as {
			data: { id: number }[]
		}
		const rooms = keysToCamelCaseInObjectOfArray(data)

		const isRoomExists = rooms?.some(element => {
			return Number(element.id) === generateId(chatUser.id, loggedUserId)
		})

		if (!isRoomExists && chatUser.id && chatUser.nickName) {
			await $api.post('/ws/createroom', {
				ReceiverId: chatUser.id,
				ReceiverName: chatUser.nickName,
			})
		}

		console.table({
			Id: generateId(chatUser.id, loggedUserId),
			ReceiverId: chatUser.id,
			ReceiverName: chatUser.nickName,
		})

		const socket = new WebSocket(
			`ws://localhost:3000/ws/joinroom?roomId=${generateId(
				chatUser.id,
				loggedUserId
			)}&userId=${loggedUserId}`
		)
		setSocket(socket)
		setCurrentChat(chatUser)
	}

	const { content, createdAt, seenTime } = lastMessage as TLastMessage

	const sentTime = new Date(createdAt)
	const formattedTime = sentTime.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})

	return (
		<div className={styles.chatListItem} onClick={() => switchChat()}>
			<div className={styles.dragHandle}></div>

			<Avatar name={chatUser.name} color={chatUser.color} />

			<div className={styles.sender}>
				<div className={styles.name}>
					{chatUser.name && chatUser.name.slice(0, 9)}{' '}
					{chatUser.name && chatUser.name.length > 9 && '...'}
				</div>
				{!search && (
					<div className={styles.message}>
						{content && content.slice(0, 18)} {content.length > 18 && '...'}
					</div>
				)}
			</div>
			{!search && (
				<div className={styles.info}>
					<div className={styles.time}>{formattedTime}</div>
					{String(seenTime).includes('000') ? (
						<Check className={styles.checked} />
					) : (
						<CheckCheck className={styles.checked} />
					)}
				</div>
			)}
		</div>
	)
}
