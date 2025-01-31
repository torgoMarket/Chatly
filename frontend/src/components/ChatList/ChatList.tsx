import { useEffect, useState } from 'react'
import { getChatsOfUser } from '../../services/userService'
import { TChatList } from '../../types/chatTypes'
import { ChatListItem } from '../Layouts/ChatListItem/ChatListItem'
import styles from './ChatList.module.scss'

interface IChatListProps {
	loggedUserId: number
	loggedUserName: string
	searchedChatList: TChatList[] | null
}

export const ChatList = ({
	loggedUserId,
	loggedUserName,
	searchedChatList,
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

	console.log('chatList', chatList)

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
								loggedUserName={loggedUserName}
								chatUserId={chatItem.id}
								chatUser={chatItem?.receiver}
								chatUserNickName={chatItem?.nickName}
								name={chatItem.name}
								lastMessage={chatItem.lastMessage}
								color={chatItem.color}
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
