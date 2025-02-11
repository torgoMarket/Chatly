import { Fragment, useEffect, useRef, useState } from 'react'
import { useChatHistory } from '../../hooks/queries/useGetChatHistory'
import useCurrentChatStore from '../../store/currentChatStore'
import { TChatHistory } from '../../types/chatTypes'
import { keysToCamelCaseInObject } from '../../utils/request'
import { ChatDate } from '../ChatDate/ChatDate'
import { Message } from '../Layouts/Message/Message'
import styles from './Chat.module.scss'

interface IChatProps {
	loggedUserId: number
}

export const Chat = ({ loggedUserId }: IChatProps) => {
	const endOfChatRef = useRef<HTMLDivElement | null>(null)
	const socket = useCurrentChatStore(state => state.socket)

	const { chatHistory, refetchChatHistory, isLoading } = useChatHistory(
		socket?.url.split('?')[1]?.split('&')[0]?.split('=')[1] || ''
	)

	const [chatMessages, setChatMessages] = useState<TChatHistory[]>([])

	const [messageCounter, setMessageCounter] = useState<number>(0)

	useEffect(() => {
		if (chatHistory) {
			if (endOfChatRef.current) {
				endOfChatRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [messageCounter, chatHistory])

	useEffect(() => {
		if (socket) {
			const handleMessage = (event: MessageEvent) => {
				const messageData = keysToCamelCaseInObject(JSON.parse(event.data))
				setChatMessages(prev => [...prev, messageData as TChatHistory])
				setMessageCounter(prev => prev + 1)
			}

			socket.addEventListener('message', handleMessage)

			return () => {
				socket.removeEventListener('message', handleMessage)
			}
		}
	}, [socket, refetchChatHistory, chatHistory])

	useEffect(() => {
		setChatMessages([])
	}, [chatHistory])

	if (isLoading) return <p>Loading chat...</p>

	return (
		<div className={styles.chat}>
			{socket && chatHistory ? (
				<>
					{chatHistory.map((message, index, arr) => {
						const seenTime = message.seenTime
							? new Date(message.seenTime)
							: null

						const createdDates = {
							previous: index > 0 ? new Date(arr[index - 1].createdAt) : null,
							current: new Date(message.createdAt),
						}

						const formattedTime = createdDates.current
							? createdDates.current.toLocaleTimeString('en-US', {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
							  })
							: ''

						return (
							<Fragment key={message.id}>
								{(!createdDates.previous ||
									createdDates.current.toDateString() !==
										createdDates.previous.toDateString()) && (
									<ChatDate viewDate={createdDates.current} />
								)}

								<Message
									text={message.content}
									variant={
										message.userId === loggedUserId ? 'sent' : 'received'
									}
									checked={
										seenTime ? !seenTime.toString().includes('000') : false
									}
									time={formattedTime}
								/>
							</Fragment>
						)
					})}
					{chatMessages.length != 0 &&
						chatMessages.map(message => {
							const createdDates = {
								previous:
									chatHistory.length > 0
										? new Date(chatHistory[chatHistory.length - 1].createdAt)
										: null,
								current: new Date(message.createdAt),
							}

							const formattedTime = createdDates.current
								? createdDates.current.toLocaleTimeString('en-US', {
										hour: '2-digit',
										minute: '2-digit',
										hour12: false,
								  })
								: ''

							return (
								<Fragment key={message.id}>
									{(!createdDates.previous ||
										createdDates.current.toDateString() !==
											createdDates.previous.toDateString()) && (
										<ChatDate viewDate={createdDates.current} />
									)}

									<Message
										text={message.content}
										variant={
											message.userId === loggedUserId ? 'sent' : 'received'
										}
										checked={false}
										time={formattedTime}
									/>
								</Fragment>
							)
						})}
				</>
			) : (
				<div className='w-full min-h-[calc(100vh-12rem)] flex justify-center items-center'>
					<h1 className='text-white text-2xl'>Select Chat from Chat List</h1>
				</div>
			)}
			<div ref={endOfChatRef} />
		</div>
	)
}
