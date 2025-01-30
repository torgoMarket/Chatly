import { useEffect, useRef } from 'react'
import { useChatHistory } from '../../hooks/queries/useGetChatHistory'
import useCurrentChatStore from '../../store/currentChatStore'
import { Message } from '../Layouts/Message/Message'
import styles from './Chat.module.scss'

interface IChatProps {
	loggedUserId: number
}

export const Chat = ({ loggedUserId }: IChatProps) => {
	const endOfChatRef = useRef<HTMLDivElement | null>(null)
	const socket = useCurrentChatStore(state => state.socket)

	const { chatHistory, refetchChatHistory, isLoading, isError } =
		useChatHistory(socket?.url.split('?')[1].split('&')[0].split('=')[1])

	useEffect(() => {
		if (endOfChatRef.current) {
			endOfChatRef.current.scrollIntoView()
		}

		if (socket) {
			console.log('socket', socket)
			socket.onmessage = event => {
				const messageData = JSON.parse(event.data)
				console.log('Received message:', messageData)

				refetchChatHistory()
			}
		}
	}, [socket, refetchChatHistory])

	if (isLoading) return <p>Loading chat...</p>
	if (isError) return <p>Error loading chat history.</p>

	return (
		<div className={styles.chat}>
			{chatHistory &&
				chatHistory.map(message => {
					const seenTime = new Date(message.seenTime)

					const formattedTime = seenTime.toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: false,
					})

					return (
						<Message
							key={message.id}
							text={message.content}
							variant={message.userId == loggedUserId ? 'sent' : 'received'}
							checked={seenTime.toString().includes('000') ? false : true}
							time={formattedTime}
						/>
					)
				})}

			<div ref={endOfChatRef} />
		</div>
	)
}
