import clsx from 'clsx'
import styles from './Chat.module.scss'

interface ChatProps {
	isSidebarOpen: boolean
}

export const Chat: React.FC<ChatProps> = ({ isSidebarOpen }) => {
	return (
		<div className={clsx(styles.chat, isSidebarOpen && styles.sidebarOpen)}>
			Chat
		</div>
	)
}
