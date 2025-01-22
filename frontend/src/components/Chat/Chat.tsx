import { useEffect, useRef } from 'react'
import useSocketStore from '../../store/socketStore'
import { Message } from '../Layouts/Message/Message'
import styles from './Chat.module.scss'

export const Chat = () => {
	const endOfChatRef = useRef<HTMLDivElement | null>(null)
	const socket = useSocketStore(state => state.socket)

	useEffect(() => {
		if (endOfChatRef.current) {
			endOfChatRef.current.scrollIntoView()
		}

		if (socket) {
			socket.onmessage = event => {
				const messageData = JSON.parse(event.data)
				console.log('Received message:', messageData)
			}
			console.log('socket', socket)
		}
	}, [socket])

	return (
		<div className={styles.chat}>
			<Message
				text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae officiis veritatis rem quas iusto recusandae dignissimos eligendi cum labore est.'
				variant='received'
				checked={true}
				time='12:00'
			/>

			<div ref={endOfChatRef} />
		</div>
	)
}
