import { useEffect, useRef } from 'react'
import { useChatHistory } from '../../hooks/queries/useGetChatHistory'
import useCurrentChatStore from '../../store/currentChatStore'
import { ChatDate } from '../Date/ChatDate'
import { Message } from '../Layouts/Message/Message'
import styles from './Chat.module.scss'

interface IChatProps {
	loggedUserId: number
}

export const Chat = ({ loggedUserId }: IChatProps) => {
	const endOfChatRef = useRef<HTMLDivElement | null>(null)
	const socket = useCurrentChatStore(state => state.socket)

	const { chatHistory, refetchChatHistory, isLoading, isError } =
		useChatHistory(
			socket?.url.split('?')[1]?.split('&')[0]?.split('=')[1] || ''
		)

	useEffect(() => {
		if (endOfChatRef.current) {
			endOfChatRef.current.scrollIntoView({ behavior: 'smooth' })
		}

		if (socket) {
			console.log('Connected socket:', socket)

			const handleMessage = (event: MessageEvent) => {
				const messageData = JSON.parse(event.data)
				console.log('Received message:', messageData)
				refetchChatHistory()
			}

			socket.addEventListener('message', handleMessage)

			return () => {
				socket.removeEventListener('message', handleMessage)
			}
		}
	}, [socket, refetchChatHistory])

	if (isLoading) return <p>Loading chat...</p>
	if (isError) return <p>Error loading chat history.</p>

	return (
		<div className={styles.chat}>
			{chatHistory?.length > 0 &&
				chatHistory.map((message, index, arr) => {
					const seenTime = message.seenTime ? new Date(message.seenTime) : null

					const createdDates = {
						previous: index > 0 ? new Date(arr[index - 1].createdAt) : null,
						current: new Date(message.createdAt),
					}

					const formattedTime = seenTime
						? seenTime.toLocaleTimeString('en-US', {
								hour: '2-digit',
								minute: '2-digit',
								hour12: false,
						  })
						: ''

					return (
						<>
							{(!createdDates.previous ||
								createdDates.current.toDateString() !==
									createdDates.previous.toDateString()) && (
								<ChatDate viewDate={createdDates.current} />
							)}

							<Message
								text={message.content}
								variant={message.userId === loggedUserId ? 'sent' : 'received'}
								checked={
									seenTime ? !seenTime.toString().includes('000') : false
								}
								time={formattedTime}
							/>
						</>
					)
				})}
			<div ref={endOfChatRef} />
		</div>
	)
}
