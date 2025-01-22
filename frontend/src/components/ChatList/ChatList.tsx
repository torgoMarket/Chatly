import avatar1 from '../../assets/images/avatar1.png'
import { ChatListItem } from '../Layouts/ChatListItem/ChatListItem'
import styles from './ChatList.module.scss'

export const ChatList = ({ chatList, userId }) => {
	const handleDragStart = (id: string) => {
		console.log(`Drag started for item with id: ${id}`)
	}

	const handleDrop = (id: string) => {
		console.log(`Item dropped on id: ${id}`)
	}

	console.log('chatList', chatList)

	return (
		<div className={styles.chatList}>
			{chatList ? (
				chatList.map(
					chatItem =>
						chatItem.ID != userId && (
							<ChatListItem
								id={chatItem.ID}
								avatar={avatar1}
								name={chatItem.Name}
								message=''
								time=''
								checked={false}
								onDragStart={handleDragStart}
								onDrop={handleDrop}
								search={true}
								userId={userId}
								nickName={chatItem.NickName}
							/>
						)
				)
			) : (
				<p className={styles.noChatsText}>
					No chats, search for users to start chatting
				</p>
			)}
		</div>
	)
}
