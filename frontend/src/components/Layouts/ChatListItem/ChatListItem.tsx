import { Check, CheckCheck, GripVertical } from 'lucide-react'
import { useRef } from 'react'
import useCurrentChatStore from '../../../store/currentChatStore'
import { TLastMessage } from '../../../types/chatTypes'
import styles from './ChatListItem.module.scss'

interface IChatListItemProps {
	search: boolean
	loggedUserId: number
	chatUserId: number
	name: string
	lastMessage: TLastMessage
	onDragStart: (id: number) => void
	onDrop: (id: number) => void
}

export const ChatListItem: React.FC<IChatListItemProps> = ({
	search,
	// loggedUserId,
	chatUserId,
	lastMessage = {},
	name,
	onDragStart,
	onDrop,
}) => {
	const dragHandleRef = useRef<HTMLDivElement | null>(null)
	// const setSocket = useCurrentChatStore(state => state.setSocket)
	const setCurrentChat = useCurrentChatStore(state => state.setCurrentChat)

	const switchChat = async () => {
		// const response = await $api.post('/ws/createroom', {
		// 	ID: `${
		// 		((chatUserId + loggedUserId) * (chatUserId + loggedUserId + 1)) / 2 +
		// 		loggedUserId
		// 	}`,
		// 	Name: chatUserId,
		// })

		// console.log('response', response)

		// const socket = new WebSocket(
		// 	`ws://localhost:3000/ws/joinroom?roomid=8&userid=${loggedUserId}&username=${chatUserId}`
		// )

		// setSocket(socket)
		setCurrentChat({ id: chatUserId, name })
	}

	const { content, createdAt, seenTime } = lastMessage as TLastMessage

	const sentTime = new Date(createdAt)
	const formattedTime = sentTime.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})

	return (
		<div
			className={styles.chatListItem}
			onDragOver={e => e.preventDefault()}
			onDrop={() => onDrop(chatUserId)}
			onClick={() => switchChat()}
		>
			<div
				className={styles.dragHandle}
				ref={dragHandleRef}
				draggable
				onDragStart={e => {
					if (e.target === dragHandleRef.current) {
						onDragStart(chatUserId)
					} else {
						e.preventDefault()
					}
				}}
			>
				{!search && <GripVertical className={styles.gripIcon} />}
			</div>

			<div className={styles.sender}>
				<div className={styles.name}>
					{name && name.slice(0, 9)} {name && name.length > 9 && '...'}
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
