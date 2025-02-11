import { useEffect, useState } from 'react'
import { getChatsOfUser } from '../../services/userService'
import { TChatList } from '../../types/chatTypes'
import { ChatListItem } from '../Layouts/ChatListItem/ChatListItem'
import styles from './ChatList.module.scss'

interface IChatListProps {
	loggedUserId: number
	loggedUserName: string
	searchedChatList: TChatList[] | null
	toggleSidebar: () => void
}

export const ChatList = ({
	loggedUserId,
	searchedChatList,
	toggleSidebar,
}: IChatListProps) => {
	const [chatList, setChatList] = useState<TChatList[] | null>(null)

	useEffect(() => {
		const getUserChats = async () => {
			const chatList = await getChatsOfUser()
			setChatList(chatList)
		}

		if (!searchedChatList) {
			getUserChats()
		} else {
			setChatList(searchedChatList)
		}
	}, [searchedChatList])

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
								chatUser={searchedChatList ? chatItem : chatItem?.user}
								lastMessage={chatItem?.lastMessage}
								toggleSidebar={toggleSidebar}
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
