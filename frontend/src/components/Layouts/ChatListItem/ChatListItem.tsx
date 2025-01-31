import { Check, CheckCheck } from 'lucide-react'
import { $api } from '../../../api'
import useCurrentChatStore from '../../../store/currentChatStore'
import { TLastMessage } from '../../../types/chatTypes'
import { Avatar } from '../../UI/Avatar/Avatar'
import styles from './ChatListItem.module.scss'

interface IChatListItemProps {
	search: boolean
	loggedUserId: number
	loggedUserName: string
	chatUserId: number
	name: string
	chatUserNickName: string
	color: string
	lastMessage: TLastMessage
}

export const ChatListItem: React.FC<IChatListItemProps> = ({
	search,
	loggedUserId,
	loggedUserName,
	chatUserId,
	chatUserNickName,
	lastMessage = {},
	name,
	color,
	chatUser,
}) => {
	const setSocket = useCurrentChatStore(state => state.setSocket)
	const setCurrentChat = useCurrentChatStore(state => state.setCurrentChat)

	const switchChat = async () => {
		const { data: rooms } = await $api.get('/ws/getrooms')

		const isRoomExists = rooms?.some(element => {
			return (
				Number(element.Id) ===
				(chatUserId ^ loggedUserId) + chatUserId * loggedUserId
			)
		})

		console.log('isRoomExists', isRoomExists)

		if (!isRoomExists && chatUserId && chatUserNickName) {
			const response = await $api.post('/ws/createroom', {
				Id: (chatUserId ^ loggedUserId) + chatUserId * loggedUserId,
				ReceiverId: chatUserId,
				ReceiverName: chatUserNickName,
			})
			console.log('response', response)
		}

		const socket = new WebSocket(
			`ws://localhost:3000/ws/joinroom?roomId=${
				((search ? chatUserId : Number(Object.keys(chatUser)[0])) ^
					loggedUserId) +
				(search ? chatUserId : Number(Object.keys(chatUser)[0])) * loggedUserId
			}&userId=${loggedUserId}`
		)
		console.log('socket', socket)
		setSocket(socket)
		setCurrentChat({ id: chatUserId, name, color })
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

			<Avatar name={loggedUserName} color={color} />

			<div className={styles.sender}>
				<div className={styles.name}>
					{name && name.slice(0, 9)} {name && name.length > 9 && '...'}
					{chatUser && chatUser[Object.keys(chatUser)[0]]}
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
