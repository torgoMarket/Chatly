import clsx from 'clsx'
import { Send, Smile } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { emojiCategories, emojis } from '../../../constants/emojiPack.ts'
import { useToggle } from '../../../hooks/useToggle'
import useSocketStore from '../../../store/socketStore.ts'
import styles from './TextBox.module.scss'

export const TextBox: React.FC = () => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const [message, setMessage] = useState('')
	const socket = useSocketStore(state => state.socket)
	const { isOpen, toggle } = useToggle(false)
	const [activeEmojiCategory, setEmojiCategory] = useState<string>('face')

	const handleInput = () => {
		const textarea = textareaRef.current
		if (textarea) {
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
	}

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(event.target.value)
		handleInput()
	}

	const sendMessage = () => {
		socket.send(message)
		console.log('Message sent:', message)
	}

	return (
		<div className={styles.textBox}>
			<textarea
				ref={textareaRef}
				value={message}
				onChange={handleChange}
				rows={1}
				placeholder='Message ...'
				className={clsx(styles.textarea, isOpen && 'mb-24 border-b')}
			/>
			<Smile className={clsx(styles.icon, styles.emoji)} onClick={toggle} />
			<Send
				className={clsx(styles.icon, styles.send)}
				onClick={() => sendMessage()}
			/>
			<div className={clsx(styles.emojiPack, isOpen && '!flex')}>
				<ul className={styles.emojiCategoriesList}>
					{emojiCategories.map((category: string) => (
						<li
							className={clsx(
								styles.emojiCategoriesListItem,
								activeEmojiCategory === category && styles.activeEmojiCategory
							)}
							key={category}
							onClick={() => setEmojiCategory(category)}
						>
							{category}
						</li>
					))}
				</ul>
				<div className={styles.emojis}>
					{emojis[activeEmojiCategory].map((emoji: string) => (
						<span
							className='cursor-pointer text-lg min-w-6'
							key={emoji}
							onClick={() => setMessage(prev => prev + emoji)}
						>
							{emoji}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
