import { useEffect, useState } from 'react'
import { getChatsOfUser } from '../../services/userService'
import { TChatList } from '../../types/chatTypes'
import { ChatListItem } from '../Layouts/ChatListItem/ChatListItem'
import styles from './ChatList.module.scss'

interface IChatListProps {
	loggedUserId: number
	searchedChatList: TChatList[] | null
}

export const ChatList = ({
	loggedUserId,
	searchedChatList,
}: IChatListProps) => {
	const handleDragStart = (id: number) => {
		console.log(`Drag started for item with id: ${id}`)
	}

	const handleDrop = (id: number) => {
		console.log(`Item dropped on id: ${id}`)
	}

	const [chatList, setChatList] = useState<TChatList[] | null>(null)

	const getUserChats = async () => {
		const chatList = await getChatsOfUser()
		setChatList(chatList)
	}

	useEffect(() => {
		if (!searchedChatList) {
			getUserChats()
		} else {
			setChatList(searchedChatList)
		}
	}, [searchedChatList])

	console.log('setChatList', searchedChatList)

	console.log(chatList)

	return (
		<div className={styles.chatList}>
			{chatList ? (
				chatList.map(
					chatItem =>
						chatItem.id != loggedUserId && (
							<ChatListItem
								key={chatItem.id}
								search={searchedChatList ? true : false}
								loggedUserId={loggedUserId}
								chatUserId={chatItem.id}
								name={chatItem.name}
								lastMessage={chatItem?.lastMessage}
								onDragStart={handleDragStart}
								onDrop={handleDrop}
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
