import { Check, CheckCheck } from 'lucide-react'

import styles from './ChatItem.module.scss'

interface ChatItemProps {
	name: string
	message: string
	time: string
	checked: boolean
	avatar: string
}

export const ChatItem: React.FC<ChatItemProps> = ({
	name,
	message,
	time,
	checked,
	avatar,
}) => {
	return (
		<div className={styles.chatItem}>
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
