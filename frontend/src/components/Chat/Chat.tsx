import { useEffect, useRef } from 'react'
import { Message } from '../Layouts/Message/Message'
import styles from './Chat.module.scss'

export const Chat = () => {
	const endOfChatRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (endOfChatRef.current) {
			endOfChatRef.current.scrollIntoView()
		}
	}, [])

	return (
		<div className={styles.chat}>
			<Message
				text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae officiis veritatis rem quas iusto recusandae dignissimos eligendi cum labore est.'
				variant='received'
				checked={true}
				time='12:00'
			/>
			<Message
				text='Hello, how are you?'
				variant='sent'
				checked={false}
				time='12:01'
			/>
			<div className={styles.date}>18 November</div>
			<Message
				text='I am fine, thank you.'
				variant='received'
				checked={true}
				time='12:02'
			/>
			<Message
				text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae officiis veritatis rem quas iusto recusandae dignissimos eligendi cum labore est.'
				variant='received'
				checked={true}
				time='12:00'
			/>
			<Message
				text='Hello, how are you?'
				variant='sent'
				checked={false}
				time='12:01'
			/>
			<Message
				text='I am fine, thank you.'
				variant='received'
				checked={true}
				time='12:02'
			/>
			<Message
				text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae officiis veritatis rem quas iusto recusandae dignissimos eligendi cum labore est.'
				variant='received'
				checked={true}
				time='12:00'
			/>
			<Message
				text='Hello, how are you?'
				variant='sent'
				checked={false}
				time='12:01'
			/>
			<div className={styles.date}>18 November</div>
			<Message
				text='I am fine, thank you.'
				variant='received'
				checked={true}
				time='12:02'
			/>
			<Message
				text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae officiis veritatis rem quas iusto recusandae dignissimos eligendi cum labore est.'
				variant='received'
				checked={true}
				time='12:00'
			/>
			<Message
				text='Hello, how are you?'
				variant='sent'
				checked={false}
				time='12:01'
			/>
			<Message
				text='I am fine, thank you.'
				variant='received'
				checked={true}
				time='12:02'
			/>
			<div ref={endOfChatRef} />
		</div>
	)
}
