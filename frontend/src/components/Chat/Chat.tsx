import { Message } from '../Layouts/Message/Message'
import styles from './Chat.module.scss'

export const Chat = () => {
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

			<Message
				text='I am fine, thank you.'
				variant='received'
				checked={true}
				time='12:02'
			/>
		</div>
	)
}
