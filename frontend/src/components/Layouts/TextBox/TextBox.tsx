import { Send } from 'lucide-react'
import React, { useRef, useState } from 'react'
import styles from './TextBox.module.scss'

export const TextBox: React.FC = () => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const [message, setMessage] = useState('')

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

	return (
		<div className={styles.textBox}>
			<textarea
				ref={textareaRef}
				value={message}
				onChange={handleChange}
				rows={1}
				placeholder='Message ...'
				className={styles.textarea}
			/>
			<Send className={styles.send} />
		</div>
	)
}
