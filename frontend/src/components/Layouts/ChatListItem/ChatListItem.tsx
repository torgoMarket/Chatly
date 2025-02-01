import { Check, CheckCheck } from 'lucide-react'
import { $api } from '../../../api'
import useCurrentChatStore from '../../../store/currentChatStore'
import { TLastMessage } from '../../../types/chatTypes'
import { TUser } from '../../../types/userTypes'
import { keysToCamelCaseInObjectOfArray } from '../../../utils/request'
import { Avatar } from '../../UI/Avatar/Avatar'
import styles from './ChatListItem.module.scss'

interface IChatListItemProps {
	search: boolean
	loggedUserId: number
	loggedUserName: string
	chatUser: TUser
	lastMessage: TLastMessage
}

export const ChatListItem: React.FC<IChatListItemProps> = ({
	search,
	loggedUserId,
	loggedUserName,
	chatUser,
	lastMessage = {},
}) => {
	const setSocket = useCurrentChatStore(state => state.setSocket)
	const storedSocket = useCurrentChatStore(state => state.socket)
	const setCurrentChat = useCurrentChatStore(state => state.setCurrentChat)

	const switchChat = async () => {
		storedSocket?.close()
		const { data } = (await $api.get('/ws/getrooms')) as {
			data: { id: number }[]
		}
		const rooms = keysToCamelCaseInObjectOfArray(data)

		const isRoomExists = rooms?.some(element => {
			return (
				Number(element.id) ===
				(chatUser?.id ^ loggedUserId) + chatUser?.id * loggedUserId
			)
		})

		console.log('isRoomExists', isRoomExists)

		if (!isRoomExists && chatUser.id && chatUser.nickName) {
			const response = await $api.post('/ws/createroom', {
				Id: (chatUser.id ^ loggedUserId) + chatUser.id * loggedUserId,
				ReceiverId: chatUser.id,
				ReceiverName: chatUser.nickName,
			})
			console.log('response', response)
		}

		const socket = new WebSocket(
			`ws://localhost:3000/ws/joinroom?roomId=${
				(chatUser.id ^ loggedUserId) + chatUser.id * loggedUserId
			}&userId=${loggedUserId}`
		)
		console.log('socket', socket)
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

			<Avatar name={loggedUserName} color={chatUser.color} />

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
