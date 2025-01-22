import { Check, CheckCheck, GripVertical } from 'lucide-react'
import { useRef } from 'react'
import { $api } from '../../../api'
import useSocketStore from '../../../store/socketStore'
import styles from './ChatListItem.module.scss'

interface ChatListItemProps {
	name: string
	message: string
	time: string
	checked: boolean
	avatar: string
	onDragStart: (id: string) => void
	onDrop: (id: string) => void
	id: string
	search: boolean
	userId: string
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
	name,
	message,
	time,
	checked,
	avatar,
	onDragStart,
	onDrop,
	id,
	search,
	userId,
	nickName,
}) => {
	const dragHandleRef = useRef<HTMLDivElement | null>(null)
	const setSocket = useSocketStore(state => state.setSocket)
	const setCurrentChat = useSocketStore(state => state.setCurrentChat)

	const switchChat = async () => {
		const response = await $api.post('/ws/createroom', {
			ID: `${((id + userId) * (id + userId + 1)) / 2 + userId}`,
			Name: nickName,
		})

		const socket = new WebSocket(
			`ws://localhost:3000/ws/joinroom?roomid=8&userid=${userId}&username=${nickName}`
		)

		setSocket(socket)
		setCurrentChat({ id, name })
	}

	return (
		<div
			className={styles.chatListItem}
			onDragOver={e => e.preventDefault()}
			onDrop={() => onDrop(id)}
			onClick={() => switchChat()}
		>
			<div
				className={styles.dragHandle}
				ref={dragHandleRef}
				draggable
				onDragStart={e => {
					if (e.target === dragHandleRef.current) {
						onDragStart(id)
					} else {
						e.preventDefault()
					}
				}}
			>
				<GripVertical className={styles.gripIcon} />
			</div>
			<div className={styles.avatar}>
				<img src={avatar} alt='Avatar' />
			</div>
			<div className={styles.sender}>
				<div className={styles.name}>
					{name && name.slice(0, 9)} {name && name.length > 9 && '...'}
				</div>
				<div className={styles.message}>
					{message && message.slice(0, 18)} {message.length > 18 && '...'}
				</div>
			</div>
			{!search && (
				<div className={styles.info}>
					<div className={styles.time}>{time}</div>
					{checked ? (
						<CheckCheck className={styles.checked} />
					) : (
						<Check className={styles.checked} />
					)}
				</div>
			)}
		</div>
	)
}
