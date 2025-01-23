import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	scale?: 'sm' | 'md' | 'lg'
	className?: string
}

export const Input: React.FC<InputProps> = ({
	scale = 'md',
	className,
	...props
}) => {
	return (
		<input
			className={clsx(styles.input, styles[scale], className)}
			{...props}
		/>
	)
}
