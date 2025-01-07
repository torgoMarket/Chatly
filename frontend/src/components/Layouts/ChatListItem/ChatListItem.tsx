import { Check, CheckCheck, GripVertical } from 'lucide-react'
import { useRef } from 'react'
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
}) => {
	const dragHandleRef = useRef<HTMLDivElement | null>(null)

	return (
		<div
			className={styles.chatListItem}
			onDragOver={e => e.preventDefault()} // Necessary to allow dropping
			onDrop={() => onDrop(id)}
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
					{name && name.slice(0, 12)} {name && name.length > 12 && '...'}
				</div>
				<div className={styles.message}>
					{message && message.slice(0, 24)} {message.length > 24 && '...'}
				</div>
			</div>
			<div className={styles.info}>
				<div className={styles.time}>{time}</div>
				{checked ? (
					<CheckCheck className={styles.checked} />
				) : (
					<Check className={styles.checked} />
				)}
			</div>
		</div>
	)
}
