import React, { useRef } from 'react'
import styles from './TextBox.module.scss'

export const TextBox: React.FC = () => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleInput = () => {
		const textarea = textareaRef.current
		if (textarea) {
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
	}

	return (
		<div className={styles.textBox}>
			<textarea
				ref={textareaRef}
				rows={1}
				placeholder='Type a message...'
				className={styles.textarea}
				onInput={handleInput}
			/>
		</div>
	)
}
