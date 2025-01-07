import avatar1 from '../../assets/images/avatar1.png'
import avatar2 from '../../assets/images/avatar2.png'
import avatar3 from '../../assets/images/avatar3.png'
import avatar4 from '../../assets/images/avatar4.png'
import { ChatListItem } from '../Layouts/ChatListItem/ChatListItem'
import styles from './ChatList.module.scss'

export const ChatList = () => {
	const handleDragStart = (id: string) => {
		console.log(`Drag started for item with id: ${id}`)
	}

	const handleDrop = (id: string) => {
		console.log(`Item dropped on id: ${id}`)
	}

	return (
		<div className={styles.chatList}>
			{/* Item 1 */}
			<ChatListItem
				id='1'
				avatar={avatar1}
				name='Amir'
				message='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
				time='14:44'
				checked={true}
				onDragStart={handleDragStart}
				onDrop={handleDrop}
			/>

			{/* Item 2 */}
			<ChatListItem
				id='2'
				avatar={avatar2}
				name='Sophia'
				message="Hey! Just wanted to check if we're meeting later today."
				time='16:12'
				checked={false}
				onDragStart={handleDragStart}
				onDrop={handleDrop}
			/>

			{/* Item 3 */}
			<ChatListItem
				id='3'
				avatar={avatar3}
				name='John Doe'
				message='Can you send me the files by tomorrow?'
				time='10:30'
				checked={true}
				onDragStart={handleDragStart}
				onDrop={handleDrop}
			/>

			{/* Item 4 */}
			<ChatListItem
				id='4'
				avatar={avatar4}
				name='Emma Watson'
				message='See you at the conference next week!'
				time='18:45'
				checked={false}
				onDragStart={handleDragStart}
				onDrop={handleDrop}
			/>
		</div>
	)
}
